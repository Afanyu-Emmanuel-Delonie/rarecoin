"use server";

import { Resend } from "resend";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CONTACTS_COLLECTION } from "@/lib/collections";

import { type ContactFormState } from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = readField(formData, "name");
  const email = readField(formData, "email");
  const subject = readField(formData, "subject");
  const message = readField(formData, "message");

  if (!name || !email || !message) return { status: "error", message: "Name, email, and message are required." };
  if (!EMAIL_PATTERN.test(email)) return { status: "error", message: "Enter a valid email address." };
  if (name.length > 200 || subject.length > 200 || message.length > 5000) return { status: "error", message: "One of the fields is too long." };

  try {
    await addDoc(collection(db, CONTACTS_COLLECTION), {
      name,
      email,
      subject: subject || "General",
      message,
      submittedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to save contact submission", error);
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
        subject: `New contact message: ${subject || "General"} — ${name}`,
        html: `<p><strong>${name}</strong> &lt;<a href="mailto:${email}">${email}</a>&gt;</p><p><strong>Subject:</strong> ${subject || "General"}</p><hr/><p>${message.replace(/\n/g, "<br/>")}</p>`,
      });
    }
  } catch (error) {
    console.error("Contact email notification failed (non-fatal)", error);
  }

  return { status: "success" };
}
