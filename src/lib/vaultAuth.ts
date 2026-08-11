import "server-only";
import { getAdminAuth } from "./firebaseAdmin";

// Verifies the Firebase ID token sent as "Authorization: Bearer <token>".
// No allowlist, no roles — just "is this a signed-in Firebase user".
export async function verifyVaultToken(idToken: string | null | undefined): Promise<string | null> {
  if (!idToken) return null;
  try {
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    return decoded.uid;
  } catch {
    return null;
  }
}

export function bearerToken(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice("Bearer ".length);
}
