"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Mail, MessageSquare, Users, Inbox, Trash2, ChevronDown, ChevronUp, Download } from "lucide-react";

interface WaitlistEntry { id: string; name: string; email: string; date: string; }
interface ContactEntry  { id: string; name: string; email: string; subject: string; message: string; date: string; }

const MOCK_WAITLIST: WaitlistEntry[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com",  date: "2025-07-01T10:22:00Z" },
  { id: "2", name: "Bob Smith",     email: "bob@example.com",    date: "2025-07-02T14:05:00Z" },
  { id: "3", name: "Carol White",   email: "carol@example.com",  date: "2025-07-03T09:11:00Z" },
  { id: "4", name: "Dan Brown",     email: "dan@example.com",    date: "2025-07-04T18:44:00Z" },
  { id: "5", name: "Eve Davis",     email: "eve@example.com",    date: "2025-07-05T07:30:00Z" },
];

const MOCK_CONTACTS: ContactEntry[] = [
  { id: "1", name: "Frank", email: "frank@example.com", subject: "Partnership", message: "Hi, we'd love to explore a partnership opportunity with Rarecoin.", date: "2025-07-03T11:00:00Z" },
  { id: "2", name: "Grace", email: "grace@example.com", subject: "Press",       message: "I'm a journalist writing about fair-launch tokens on Solana. Can we chat?", date: "2025-07-04T15:20:00Z" },
  { id: "3", name: "Hank",  email: "hank@example.com",  subject: "General",     message: "When is the launch date? Really excited about this project.", date: "2025-07-05T08:55:00Z" },
];

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function exportCSV(data: WaitlistEntry[]) {
  const header = ["#", "Name", "Email", "Date"];
  const rows   = data.map((e, i) => [i + 1, e.name, e.email, fmt(e.date)]);
  const csv    = [header, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
  dl("waitlist.csv", "text/csv", csv);
}

function exportExcel(data: WaitlistEntry[]) {
  const rows = [["#", "Name", "Email", "Date"], ...data.map((e, i) => [String(i + 1), e.name, e.email, fmt(e.date)])];
  const xmlRows = rows.map((r) => `<Row>${r.map((c) => `<Cell><Data ss:Type="String">${c.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</Data></Cell>`).join("")}</Row>`).join("");
  const xml = `<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="Waitlist"><Table>${xmlRows}</Table></Worksheet></Workbook>`;
  dl("waitlist.xls", "application/vnd.ms-excel", xml);
}

function dl(filename: string, mime: string, content: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  Object.assign(document.createElement("a"), { href: url, download: filename }).click();
  URL.revokeObjectURL(url);
}

type Tab = "waitlist" | "contacts";

export default function VaultDashboard() {
  const router = useRouter();
  const [tab, setTab]           = useState<Tab>("waitlist");
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(MOCK_WAITLIST);
  const [contacts, setContacts] = useState<ContactEntry[]>(MOCK_CONTACTS);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("vault_auth") !== "1") router.replace("/vault/login");
  }, [router]);

  const logout = () => { sessionStorage.removeItem("vault_auth"); router.push("/vault/login"); };

  return (
    <div className="min-h-screen bg-[#F4F6FB] py-26">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#0b0c12]/8 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-16">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/rarecoin.svg" alt="Rarecoin" className="h-5 w-auto sm:h-6" />
            <span className="font-heading text-sm font-bold text-[#0b0c12] sm:text-base">Vault</span>
            <span className="rounded-full bg-[#3355ff]/10 px-2 py-0.5 text-xs font-semibold text-[#3355ff]">Internal</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 rounded-xl border border-[#0b0c12]/10 bg-white px-3 py-2 text-xs font-semibold text-[#0b0c12]/50 transition-all hover:border-[#0b0c12]/20 hover:text-[#0b0c12] sm:gap-2 sm:px-4"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-16">

        {/* Page heading */}
        <div className="mb-8 flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Dashboard</span>
          <h1 className="font-heading text-2xl font-bold text-[#0b0c12] sm:text-3xl">Collected Data</h1>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { icon: Users,         label: "Waitlist", value: waitlist.length },
            { icon: MessageSquare, label: "Messages", value: contacts.length },
            { icon: Inbox,         label: "Total",    value: waitlist.length + contacts.length },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col gap-2 rounded-2xl border border-[#0b0c12]/6 bg-white p-4 sm:gap-3 sm:p-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#3355ff]/10 sm:h-9 sm:w-9">
                <Icon size={14} className="text-[#3355ff] sm:size-4" />
              </div>
              <div>
                <p className="font-heading text-xl font-bold text-[#0b0c12] sm:text-2xl">{value}</p>
                <p className="text-[10px] uppercase tracking-wider text-[#0b0c12]/35 sm:text-xs">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-5 flex gap-1.5 rounded-2xl border border-[#0b0c12]/8 bg-white p-1.5 w-fit">
          {(["waitlist", "contacts"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold capitalize transition-all sm:px-5 sm:text-sm ${
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
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0b0c12]/6 px-4 py-4 sm:px-6">
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
                          <td className="px-6 py-4 text-xs text-[#0b0c12]/40">{fmt(entry.date)}</td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => setWaitlist(waitlist.filter((w) => w.id !== entry.id))}
                              className="text-[#0b0c12]/20 transition-colors hover:text-red-500">
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
                    <div key={entry.id} className="flex items-start justify-between gap-3 px-4 py-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#3355ff]/10 text-xs font-bold text-[#3355ff]">
                          {i + 1}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-semibold text-[#0b0c12]">{entry.name}</span>
                          <span className="text-xs text-[#0b0c12]/55">{entry.email}</span>
                          <span className="text-xs text-[#0b0c12]/30">{fmt(entry.date)}</span>
                        </div>
                      </div>
                      <button onClick={() => setWaitlist(waitlist.filter((w) => w.id !== entry.id))}
                        className="mt-0.5 shrink-0 text-[#0b0c12]/20 transition-colors hover:text-red-500">
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
            <div className="flex items-center justify-between border-b border-[#0b0c12]/6 px-4 py-4 sm:px-6">
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
                      <span className="shrink-0 text-xs text-[#0b0c12]/25">{fmt(entry.date)}</span>
                      <span role="button" tabIndex={0}
                        onClick={(e) => { e.stopPropagation(); setContacts(contacts.filter((c) => c.id !== entry.id)); }}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); setContacts(contacts.filter((c) => c.id !== entry.id)); }}}
                        className="shrink-0 cursor-pointer text-[#0b0c12]/20 transition-colors hover:text-red-500">
                        <Trash2 size={14} />
                      </span>
                      {expanded === entry.id
                        ? <ChevronUp size={14} className="shrink-0 text-[#0b0c12]/25" />
                        : <ChevronDown size={14} className="shrink-0 text-[#0b0c12]/25" />}
                    </div>

                    {/* Mobile card */}
                    <div className="flex flex-col gap-3 px-4 py-4 sm:hidden">
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
                            <span className="text-xs text-[#0b0c12]/25">{fmt(entry.date)}</span>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <button onClick={() => setContacts(contacts.filter((c) => c.id !== entry.id))}
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
                      <div className="border-t border-[#0b0c12]/6 bg-[#F4F6FB] px-4 py-4 sm:px-6 sm:py-5">
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
