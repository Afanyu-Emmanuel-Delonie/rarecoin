import { getAdminDb } from "@/lib/firebaseAdmin";
import { WAITLIST_COLLECTION } from "@/lib/collections";
import { bearerToken, verifyVaultToken } from "@/lib/vaultAuth";

export const dynamic = "force-dynamic";
import type { Timestamp } from "firebase-admin/firestore";

export async function GET(request: Request) {
  const uid = await verifyVaultToken(bearerToken(request));
  if (!uid) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const snap = await getAdminDb().collection(WAITLIST_COLLECTION).orderBy("submittedAt", "desc").limit(500).get();
  const data = snap.docs.map((doc) => {
    const d = doc.data();
    const ts = d.submittedAt as Timestamp | undefined;
    return {
      id: doc.id,
      name: String(d.name ?? ""),
      email: String(d.email ?? ""),
      submittedAt: ts?.toDate ? ts.toDate().toISOString() : new Date().toISOString(),
    };
  });
  return Response.json(data);
}
