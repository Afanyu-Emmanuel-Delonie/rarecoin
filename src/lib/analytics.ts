"use client";

import { logEvent } from "firebase/analytics";
import { getFirebaseAnalytics } from "./firebase";

export async function logPageView(path: string): Promise<void> {
  const analytics = await getFirebaseAnalytics();
  if (!analytics) return;
  logEvent(analytics, "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export async function trackEvent(name: string, params?: Record<string, unknown>): Promise<void> {
  const analytics = await getFirebaseAnalytics();
  if (!analytics) return;
  logEvent(analytics, name, params);
}
