"use client";

import { useCallback, useSyncExternalStore } from "react";

const cache = new Map<string, MediaQueryList>();

function getMediaQuery(query: string): MediaQueryList {
  let entry = cache.get(query);

  if (!entry) {
    entry = window.matchMedia(query);
    cache.set(query, entry);
  }

  return entry;
}

/**
 * Live media-query result.
 *
 * The server has no viewport, so the server snapshot is always `false` and the
 * hydration render agrees with it. Callers must therefore branch on the value
 * inside style ranges or effects rather than in the markup they emit, the same
 * way `useReducedMotion` is used.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = getMediaQuery(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => getMediaQuery(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Coarse pointer with no hover — phones and most tablets. */
export const TOUCH_QUERY = "(hover: none) and (pointer: coarse)";
