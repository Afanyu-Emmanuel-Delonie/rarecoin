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
    <div className="min-h-screen bg-[#08090D] py-26">

      {/* Header */}
      <header className="sticky mx-5 lg:mx-15 rounded-xl top-0 z-40 border-b border-white/6 bg-[#08090D]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-16">
          <div className="flex items-center gap-3">
            <img src="/rare-3.png" alt="Rarecoin" className="h-6 w-auto" />
            <span className="font-heading text-base font-bold text-white">Vault</span>
            <span className="rounded-full bg-[#D4AF37]/12 px-2.5 py-0.5 text-xs font-semibold text-[#D4AF37]">Internal</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-white/30 sm:inline">{adminEmail}</span>
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-xs font-semibold text-white/40 transition-all hover:border-white/20 hover:text-white/80"
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
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Dashboard</span>
          <h1 className="font-heading text-3xl font-bold text-white">Collected Data</h1>
        </div>

        {banner && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-500/20 bg-red-500/8 px-5 py-3 text-sm text-red-400">
            {banner}
            <button onClick={() => setBanner("")} className="text-xs font-semibold text-red-400 hover:text-red-300">Dismiss</button>
          </div>
        )}

        {/* Stats */}
        <div className="mb-10 grid grid-cols-3 gap-4">
          {[
            { icon: Users,         label: "Waitlist", value: waitlist.length },
            { icon: MessageSquare, label: "Messages", value: contacts.length },
            { icon: Inbox,         label: "Total",    value: waitlist.length + contacts.length },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col gap-3 rounded-2xl border border-white/6 bg-[#111318] p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D4AF37]/10">
                <Icon size={16} className="text-[#D4AF37]" />
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-white">{value}</p>
                <p className="text-xs uppercase tracking-wider text-white/30">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1.5 rounded-2xl border border-white/6 bg-[#111318] p-1.5 w-fit">
          {(["waitlist", "contacts"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-xl px-5 py-2 text-sm font-semibold capitalize transition-all ${
                tab === t ? "bg-[#D4AF37] text-[#08090D] shadow-sm" : "text-white/35 hover:text-white/70"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Waitlist ── */}
        {tab === "waitlist" && (
          <div className="rounded-2xl border border-white/6 bg-[#111318] overflow-hidden">

            {/* Panel header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/6 px-6 py-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <h2 className="font-heading text-sm font-bold text-white">Waitlist Signups</h2>
                <span className="text-xs text-white/25">{waitlist.length} entries</span>
              </div>
              {waitlist.length > 0 && (
                <div className="flex items-center gap-2">
                  <button onClick={() => exportCSV(waitlist)}
                    className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-semibold text-white/50 transition-all hover:border-white/20 hover:text-white/80">
                    <Download size={11} /> CSV
                  </button>
                  <button onClick={() => exportExcel(waitlist)}
                    className="flex items-center gap-1.5 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/8 px-3 py-1.5 text-xs font-semibold text-[#D4AF37] transition-all hover:bg-[#D4AF37]/15">
                    <Download size={11} /> Excel
                  </button>
                </div>
              )}
            </div>

            {waitlist.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <Mail size={28} className="text-white/10" />
                <p className="text-sm text-white/25">No signups yet.</p>
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden sm:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/6">
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/20">#</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/20">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/20">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/20">Date</th>
                        <th className="px-6 py-3" />
                      </tr>
                    </thead>
                    <tbody>
                      {waitlist.map((entry, i) => (
                        <tr key={entry.id} className="border-b border-white/4 transition-colors hover:bg-white/3">
                          <td className="px-6 py-4 text-xs text-white/20">{i + 1}</td>
                          <td className="px-6 py-4 text-sm font-medium text-white/80">{entry.name}</td>
                          <td className="px-6 py-4 text-sm text-white/50">{entry.email}</td>
                          <td className="px-6 py-4 text-xs text-white/35">{fmt(entry.submittedAt)}</td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => removeWaitlistEntry(entry)} disabled={pendingIds.has(entry.id)}
                              className="text-white/20 transition-colors hover:text-red-400 disabled:opacity-30">
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="flex flex-col divide-y divide-white/6 sm:hidden">
                  {waitlist.map((entry, i) => (
                    <div key={entry.id} className="flex items-start justify-between gap-3 px-6 py-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-xs font-bold text-[#D4AF37]">
                          {i + 1}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-semibold text-white/80">{entry.name}</span>
                          <span className="text-xs text-white/45">{entry.email}</span>
                          <span className="text-xs text-white/25">{fmt(entry.submittedAt)}</span>
                        </div>
                      </div>
                      <button onClick={() => removeWaitlistEntry(entry)} disabled={pendingIds.has(entry.id)}
                        className="mt-0.5 shrink-0 text-white/20 transition-colors hover:text-red-400 disabled:opacity-30">
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
          <div className="rounded-2xl border border-white/6 bg-[#111318] overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/6 px-6 py-4">
              <h2 className="font-heading text-sm font-bold text-white">Contact Messages</h2>
              <span className="text-xs text-white/25">{contacts.length} messages</span>
            </div>

            {contacts.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <MessageSquare size={28} className="text-white/10" />
                <p className="text-sm text-white/25">No messages yet.</p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-white/6">
                {contacts.map((entry) => (
                  <div key={entry.id}>

                    {/* Desktop row */}
                    <div
                      role="button" tabIndex={0}
                      onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                      onKeyDown={(e) => e.key === "Enter" && setExpanded(expanded === entry.id ? null : entry.id)}
                      className="hidden cursor-pointer items-center gap-4 px-6 py-4 transition-colors hover:bg-white/3 sm:flex"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-xs font-bold uppercase text-[#D4AF37]">
                        {entry.name[0]}
                      </div>
                      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white/80">{entry.name}</span>
                          <span className="rounded-full bg-white/6 px-2 py-0.5 text-xs text-white/35">{entry.subject}</span>
                        </div>
                        <span className="truncate text-xs text-white/30">{entry.email}</span>
                      </div>
                      <span className="shrink-0 text-xs text-white/20">{fmt(entry.submittedAt)}</span>
                      <span role="button" tabIndex={0}
                        onClick={(e) => { e.stopPropagation(); removeContactEntry(entry); }}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); removeContactEntry(entry); }}}
                        className="shrink-0 cursor-pointer text-white/20 transition-colors hover:text-red-400">
                        <Trash2 size={14} />
                      </span>
                      {expanded === entry.id
                        ? <ChevronUp size={14} className="shrink-0 text-white/20" />
                        : <ChevronDown size={14} className="shrink-0 text-white/20" />}
                    </div>

                    {/* Mobile card */}
                    <div className="flex flex-col gap-3 px-6 py-4 sm:hidden">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-xs font-bold uppercase text-[#D4AF37]">
                            {entry.name[0]}
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-sm font-semibold text-white/80">{entry.name}</span>
                              <span className="rounded-full bg-white/6 px-2 py-0.5 text-xs text-white/35">{entry.subject}</span>
                            </div>
                            <span className="text-xs text-white/35">{entry.email}</span>
                            <span className="text-xs text-white/20">{fmt(entry.submittedAt)}</span>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <button onClick={() => removeContactEntry(entry)}
                            className="text-white/20 transition-colors hover:text-red-400">
                            <Trash2 size={14} />
                          </button>
                          <button onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                            className="text-white/20">
                            {expanded === entry.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded message — shared */}
                    {expanded === entry.id && (
                      <div className="border-t border-white/6 bg-white/3 px-6 py-5">
                        <p className="text-sm leading-relaxed text-white/50">{entry.message}</p>
                        <a href={`mailto:${entry.email}`}
                          className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/8 px-4 py-2 text-xs font-semibold text-[#D4AF37] transition-all hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/15">
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
