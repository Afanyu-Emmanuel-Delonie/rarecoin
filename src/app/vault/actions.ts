"use server";

import { getAdminDb } from "@/lib/firebaseAdmin";
import { CONTACTS_COLLECTION, WAITLIST_COLLECTION } from "@/lib/collections";
import { verifyVaultToken } from "@/lib/vaultAuth";

export interface VaultActionResult {
  ok: boolean;
  error?: string;
}

export async function deleteContactEntry(id: string, idToken: string): Promise<VaultActionResult> {
  const uid = await verifyVaultToken(idToken);
  if (!uid) return { ok: false, error: "Not signed in." };

  try {
    await getAdminDb().collection(CONTACTS_COLLECTION).doc(id).delete();
    return { ok: true };
  } catch (error) {
    console.error("Failed to delete contact entry", error);
    return { ok: false, error: "Failed to delete entry." };
  }
}

export async function deleteWaitlistEntry(id: string, idToken: string): Promise<VaultActionResult> {
  const uid = await verifyVaultToken(idToken);
  if (!uid) return { ok: false, error: "Not signed in." };

  try {
    await getAdminDb().collection(WAITLIST_COLLECTION).doc(id).delete();
    return { ok: true };
  } catch (error) {
    console.error("Failed to delete waitlist entry", error);
    return { ok: false, error: "Failed to delete entry." };
  }
}
