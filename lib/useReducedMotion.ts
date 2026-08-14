"use client";

import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

let mediaQuery: MediaQueryList | null = null;

function getMediaQuery(): MediaQueryList {
  mediaQuery ??= window.matchMedia(REDUCED_MOTION_QUERY);
  return mediaQuery;
}

function subscribe(onStoreChange: () => void): () => void {
  const query = getMediaQuery();
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getSnapshot(): boolean {
  return getMediaQuery().matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Reduced-motion preference, read straight from the media query.
 *
 * Framer Motion's own `useReducedMotion` takes a one-time `useState` snapshot
 * of the preference (its source carries a  acknowledging this), so it never
 * updates when the setting is toggled mid-session and any value derived from it
 * goes stale. `useSyncExternalStore` subscribes to the query instead, which
 * re-renders on change and keeps the server render and the hydration render in
 * agreement.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
