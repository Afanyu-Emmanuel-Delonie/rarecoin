export interface WaitlistFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export const initialWaitlistFormState: WaitlistFormState = { status: "idle" };
export const initialContactFormState: ContactFormState = { status: "idle" };
