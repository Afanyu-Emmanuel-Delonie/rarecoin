"use client";

import { useState } from "react";
import { LogOut, Mail, MessageSquare, Users, Inbox, Trash2, ChevronDown, ChevronUp, Download } from "lucide-react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { deleteContactEntry, deleteWaitlistEntry } from "./actions";

export interface WaitlistRecord { id: string; name: string; email: string; submittedAt: string; }
export interface ContactRecord  { id: string; name: string; email: string; subject: string; message: string; submittedAt: string; }

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function dl(filename: string, mime: string, content: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  Object.assign(document.createElement("a"), { href: url, download: filename }).click();
  URL.revokeObjectURL(url);
}

function exportCSV(data: WaitlistRecord[]) {
  const header = ["#", "Name", "Email", "Date"];
  const rows   = data.map((e, i) => [i + 1, e.name, e.email, fmt(e.submittedAt)]);
  const csv    = [header, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
  dl("waitlist.csv", "text/csv", csv);
}

function exportExcel(data: WaitlistRecord[]) {
  const rows = [["#", "Name", "Email", "Date"], ...data.map((e, i) => [String(i + 1), e.name, e.email, fmt(e.submittedAt)])];
  const xmlRows = rows.map((r) => `<Row>${r.map((c) => `<Cell><Data ss:Type="String">${c.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</Data></Cell>`).join("")}</Row>`).join("");
  const xml = `<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="Waitlist"><Table>${xmlRows}</Table></Worksheet></Workbook>`;
  dl("waitlist.xls", "application/vnd.ms-excel", xml);
}

type Tab = "waitlist" | "contacts";

interface Props {
  adminEmail: string;
  initialContacts: ContactRecord[];
  initialWaitlist: WaitlistRecord[];
}

export default function VaultDashboard({ adminEmail, initialContacts, initialWaitlist }: Props) {
  const [tab, setTab]           = useState<Tab>("waitlist");
  const [waitlist, setWaitlist] = useState<WaitlistRecord[]>(initialWaitlist);
  const [contacts, setContacts] = useState<ContactRecord[]>(initialContacts);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  const [banner, setBanner] = useState("");
  const router = useRouter();

  const removeWaitlistEntry = async (entry: WaitlistRecord) => {
    setPendingIds((s) => new Set(s).add(entry.id));
    setWaitlist((list) => list.filter((w) => w.id !== entry.id));
    const idToken = await auth.currentUser?.getIdToken();
    const result = idToken
      ? await deleteWaitlistEntry(entry.id, idToken)
      : { ok: false, error: "Not signed in." };
    setPendingIds((s) => { const next = new Set(s); next.delete(entry.id); return next; });
    if (!result.ok) {
      setWaitlist((list) => [...list, entry].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)));
      setBanner(result.error ?? "Failed to delete entry.");
    }
  };

  const removeContactEntry = async (entry: ContactRecord) => {
    setPendingIds((s) => new Set(s).add(entry.id));
    setContacts((list) => list.filter((c) => c.id !== entry.id));
    const idToken = await auth.currentUser?.getIdToken();
    const result = idToken
      ? await deleteContactEntry(entry.id, idToken)
      : { ok: false, error: "Not signed in." };
    setPendingIds((s) => { const next = new Set(s); next.delete(entry.id); return next; });
    if (!result.ok) {
      setContacts((list) => [...list, entry].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)));
      setBanner(result.error ?? "Failed to delete entry.");
    }
  };

  const logout = async () => { await signOut(auth); router.push("/vault/login"); };

  return (
    <div className="min-h-screen bg-[#F4F6FB] py-26">

      {/* Header */}
      <header className="sticky mx-5 lg:mx-15 rounded-xl top-0 z-40 border-b border-[#0b0c12]/8 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-16">
          <div className="flex items-center gap-3">
            <img src="/rarecoin.svg" alt="Rarecoin" className="h-6 w-auto" />
            <span className="font-heading text-base font-bold text-[#0b0c12]">Vault</span>
            <span className="rounded-full bg-[#3355ff]/10 px-2.5 py-0.5 text-xs font-semibold text-[#3355ff]">Internal</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-[#0b0c12]/35 sm:inline">{adminEmail}</span>
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-xl border border-[#0b0c12]/10 bg-white px-4 py-3 text-xs font-semibold text-[#0b0c12]/50 transition-all hover:border-[#0b0c12]/20 hover:text-[#0b0c12]"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-16">

        {/* Page heading */}
        <div className="mb-10 flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Dashboard</span>
          <h1 className="font-heading text-3xl font-bold text-[#0b0c12]">Collected Data</h1>
        </div>

        {banner && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-600">
            {banner}
            <button onClick={() => setBanner("")} className="text-xs font-semibold text-red-500 hover:text-red-700">Dismiss</button>
          </div>
        )}

        {/* Stats */}
        <div className="mb-10 grid grid-cols-3 gap-4">
          {[
            { icon: Users,         label: "Waitlist", value: waitlist.length },
            { icon: MessageSquare, label: "Messages", value: contacts.length },
            { icon: Inbox,         label: "Total",    value: waitlist.length + contacts.length },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col gap-3 rounded-2xl border border-[#0b0c12]/6 bg-white p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3355ff]/10">
                <Icon size={16} className="text-[#3355ff]" />
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-[#0b0c12]">{value}</p>
                <p className="text-xs uppercase tracking-wider text-[#0b0c12]/35">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1.5 rounded-2xl border border-[#0b0c12]/8 bg-white p-1.5 w-fit">
          {(["waitlist", "contacts"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-xl px-5 py-2 text-sm font-semibold capitalize transition-all ${
                tab === t ? "bg-[#0b0c12] text-white shadow-sm" : "text-[#0b0c12]/40 hover:text-[#0b0c12]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Waitlist ── */}
        {tab === "waitlist" && (
          <div className="rounded-2xl border border-[#0b0c12]/8 bg-white overflow-hidden">

            {/* Panel header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0b0c12]/6 px-6 py-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <h2 className="font-heading text-sm font-bold text-[#0b0c12]">Waitlist Signups</h2>
                <span className="text-xs text-[#0b0c12]/30">{waitlist.length} entries</span>
              </div>
              {waitlist.length > 0 && (
                <div className="flex items-center gap-2">
                  <button onClick={() => exportCSV(waitlist)}
                    className="flex items-center gap-1.5 rounded-xl border border-[#0b0c12]/10 bg-[#F4F6FB] px-3 py-1.5 text-xs font-semibold text-[#0b0c12]/60 transition-all hover:border-[#0b0c12]/20 hover:text-[#0b0c12]">
                    <Download size={11} /> CSV
                  </button>
                  <button onClick={() => exportExcel(waitlist)}
                    className="flex items-center gap-1.5 rounded-xl border border-[#3355ff]/20 bg-[#3355ff]/6 px-3 py-1.5 text-xs font-semibold text-[#3355ff] transition-all hover:bg-[#3355ff]/12">
                    <Download size={11} /> Excel
                  </button>
                </div>
              )}
            </div>

            {waitlist.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <Mail size={28} className="text-[#0b0c12]/10" />
                <p className="text-sm text-[#0b0c12]/30">No signups yet.</p>
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden sm:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#0b0c12]/6">
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0b0c12]/25">#</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0b0c12]/25">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0b0c12]/25">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0b0c12]/25">Date</th>
                        <th className="px-6 py-3" />
                      </tr>
                    </thead>
                    <tbody>
                      {waitlist.map((entry, i) => (
                        <tr key={entry.id} className="border-b border-[#0b0c12]/4 transition-colors hover:bg-[#F4F6FB]">
                          <td className="px-6 py-4 text-xs text-[#0b0c12]/25">{i + 1}</td>
                          <td className="px-6 py-4 text-sm font-medium text-[#0b0c12]">{entry.name}</td>
                          <td className="px-6 py-4 text-sm text-[#0b0c12]/60">{entry.email}</td>
                          <td className="px-6 py-4 text-xs text-[#0b0c12]/40">{fmt(entry.submittedAt)}</td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => removeWaitlistEntry(entry)} disabled={pendingIds.has(entry.id)}
                              className="text-[#0b0c12]/20 transition-colors hover:text-red-500 disabled:opacity-30">
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="flex flex-col divide-y divide-[#0b0c12]/6 sm:hidden">
                  {waitlist.map((entry, i) => (
                    <div key={entry.id} className="flex items-start justify-between gap-3 px-6 py-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#3355ff]/10 text-xs font-bold text-[#3355ff]">
                          {i + 1}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-semibold text-[#0b0c12]">{entry.name}</span>
                          <span className="text-xs text-[#0b0c12]/55">{entry.email}</span>
                          <span className="text-xs text-[#0b0c12]/30">{fmt(entry.submittedAt)}</span>
                        </div>
                      </div>
                      <button onClick={() => removeWaitlistEntry(entry)} disabled={pendingIds.has(entry.id)}
                        className="mt-0.5 shrink-0 text-[#0b0c12]/20 transition-colors hover:text-red-500 disabled:opacity-30">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Contacts ── */}
        {tab === "contacts" && (
          <div className="rounded-2xl border border-[#0b0c12]/8 bg-white overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#0b0c12]/6 px-6 py-4">
              <h2 className="font-heading text-sm font-bold text-[#0b0c12]">Contact Messages</h2>
              <span className="text-xs text-[#0b0c12]/30">{contacts.length} messages</span>
            </div>

            {contacts.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <MessageSquare size={28} className="text-[#0b0c12]/10" />
                <p className="text-sm text-[#0b0c12]/30">No messages yet.</p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-[#0b0c12]/6">
                {contacts.map((entry) => (
                  <div key={entry.id}>

                    {/* Desktop row */}
                    <div
                      role="button" tabIndex={0}
                      onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                      onKeyDown={(e) => e.key === "Enter" && setExpanded(expanded === entry.id ? null : entry.id)}
                      className="hidden cursor-pointer items-center gap-4 px-6 py-4 transition-colors hover:bg-[#F4F6FB] sm:flex"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3355ff]/10 text-xs font-bold uppercase text-[#3355ff]">
                        {entry.name[0]}
                      </div>
                      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#0b0c12]">{entry.name}</span>
                          <span className="rounded-full bg-[#0b0c12]/6 px-2 py-0.5 text-xs text-[#0b0c12]/40">{entry.subject}</span>
                        </div>
                        <span className="truncate text-xs text-[#0b0c12]/35">{entry.email}</span>
                      </div>
                      <span className="shrink-0 text-xs text-[#0b0c12]/25">{fmt(entry.submittedAt)}</span>
                      <span role="button" tabIndex={0}
                        onClick={(e) => { e.stopPropagation(); removeContactEntry(entry); }}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); removeContactEntry(entry); }}}
                        className="shrink-0 cursor-pointer text-[#0b0c12]/20 transition-colors hover:text-red-500">
                        <Trash2 size={14} />
                      </span>
                      {expanded === entry.id
                        ? <ChevronUp size={14} className="shrink-0 text-[#0b0c12]/25" />
                        : <ChevronDown size={14} className="shrink-0 text-[#0b0c12]/25" />}
                    </div>

                    {/* Mobile card */}
                    <div className="flex flex-col gap-3 px-6 py-4 sm:hidden">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3355ff]/10 text-xs font-bold uppercase text-[#3355ff]">
                            {entry.name[0]}
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-sm font-semibold text-[#0b0c12]">{entry.name}</span>
                              <span className="rounded-full bg-[#0b0c12]/6 px-2 py-0.5 text-xs text-[#0b0c12]/40">{entry.subject}</span>
                            </div>
                            <span className="text-xs text-[#0b0c12]/40">{entry.email}</span>
                            <span className="text-xs text-[#0b0c12]/25">{fmt(entry.submittedAt)}</span>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <button onClick={() => removeContactEntry(entry)}
                            className="text-[#0b0c12]/20 transition-colors hover:text-red-500">
                            <Trash2 size={14} />
                          </button>
                          <button onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                            className="text-[#0b0c12]/25">
                            {expanded === entry.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded message — shared */}
                    {expanded === entry.id && (
                      <div className="border-t border-[#0b0c12]/6 bg-[#F4F6FB] px-6 py-5">
                        <p className="text-sm leading-relaxed text-[#0b0c12]/60">{entry.message}</p>
                        <a href={`mailto:${entry.email}`}
                          className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#3355ff]/25 bg-[#3355ff]/6 px-4 py-2 text-xs font-semibold text-[#3355ff] transition-all hover:border-[#3355ff]/50 hover:bg-[#3355ff]/12">
                          <Mail size={12} />
                          Reply to {entry.email}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
