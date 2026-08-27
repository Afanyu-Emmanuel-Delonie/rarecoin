export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export const initialContactFormState: ContactFormState = { status: "idle" };
