import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";

function getAdminApp(): App {
  if (getApps().length) return getApps()[0];

  // Prefer individual vars (more reliable in Vercel) over the full JSON blob
  const projectId   = process.env.FIREBASE_PROJECT_ID   ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey  = process.env.FIREBASE_PRIVATE_KEY;

  if (projectId && clientEmail && privateKey) {
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, "\n"),
      }),
    });
  }

  // Fallback: full JSON blob
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) throw new Error("Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY or FIREBASE_SERVICE_ACCOUNT_KEY");

  let sa: Record<string, string>;
  try {
    sa = JSON.parse(raw);
  } catch {
    try {
      sa = JSON.parse(raw.replace(/\\\\n/g, "\\n"));
    } catch (e) {
      throw new Error(`FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON: ${e}`);
    }
  }

  if (!sa.project_id || !sa.client_email || !sa.private_key) {
    throw new Error(`FIREBASE_SERVICE_ACCOUNT_KEY missing fields. Got: ${Object.keys(sa).join(", ")}`);
  }

  const privateKeyFromJson = sa.private_key.replace(/\\n/g, "\n").replace(/\\\\n/g, "\n");

  return initializeApp({
    credential: cert({
      projectId: sa.project_id,
      clientEmail: sa.client_email,
      privateKey: privateKeyFromJson,
    }),
  });
}

let db: Firestore | undefined;
let auth: Auth | undefined;

export function getAdminDb(): Firestore {
  if (!db) db = getFirestore(getAdminApp());
  return db;
}

export function getAdminAuth(): Auth {
  if (!auth) auth = getAuth(getAdminApp());
  return auth;
}
