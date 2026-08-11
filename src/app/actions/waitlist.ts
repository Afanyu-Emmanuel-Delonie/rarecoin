"use server";

import { Resend } from "resend";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { WAITLIST_COLLECTION } from "@/lib/collections";

import { type WaitlistFormState } from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitWaitlistForm(
  _prevState: WaitlistFormState,
  formData: FormData
): Promise<WaitlistFormState> {
  const name = readField(formData, "name");
  const email = readField(formData, "email");

  if (!name || !email) return { status: "error", message: "Name and email are required." };
  if (!EMAIL_PATTERN.test(email)) return { status: "error", message: "Enter a valid email address." };
  if (name.length > 200) return { status: "error", message: "Name is too long." };

  try {
    await addDoc(collection(db, WAITLIST_COLLECTION), {
      name,
      email,
      submittedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to save waitlist submission", error);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  // Best-effort email — silent fail so user always sees success
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const adminEmail = process.env.ADMIN_EMAIL;
    if (resend && adminEmail) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Rarecoin <onboarding@resend.dev>",
        to: adminEmail,
        cc: (process.env.ADMIN_CC ?? "").split(",").map((s) => s.trim()).filter(Boolean),
        subject: `New waitlist signup: ${name}`,
        html: `<p><strong>${name}</strong> joined the waitlist.</p><p>Email: <a href="mailto:${email}">${email}</a></p>`,
      });
    }
  } catch (error) {
    console.error("Waitlist email notification failed (non-fatal)", error);
  }

  return { status: "success" };
}
