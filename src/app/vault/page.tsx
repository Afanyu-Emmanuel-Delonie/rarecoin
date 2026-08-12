"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import VaultDashboard, { type ContactRecord, type WaitlistRecord } from "./VaultDashboardClient";

export default function VaultPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistRecord[]>([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/vault/login");
        return;
      }
      setEmail(user.email ?? "");

      const idToken = await user.getIdToken();
      const authHeader = { Authorization: `Bearer ${idToken}` };
      const [c, w] = await Promise.all([
        fetch("/api/vault/contacts", { headers: authHeader }).then((r) => r.json()),
        fetch("/api/vault/waitlist", { headers: authHeader }).then((r) => r.json()),
      ]);
      setContacts(c);
      setWaitlist(w);
      setReady(true);
    });
    return unsub;
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#08090D] flex items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-[#D4AF37]" />
      </div>
    );
  }

  return <VaultDashboard adminEmail={email} initialContacts={contacts} initialWaitlist={waitlist} />;
}
