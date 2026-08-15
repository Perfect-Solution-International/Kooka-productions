"use client";

import { useSyncExternalStore } from "react";
import { resolveQualityTier, type QualityTier } from "./quality";

/**
 * The active tier, held in a module store.
 *
 * Two things force this shape. The tier cannot be resolved during the server
 * render, so it has to arrive through the same external-store path the rest of
 * the codebase uses for browser-only state; and the frame-rate guard has to be
 * able to lower it at runtime, which a value derived once in an effect could
 * not do without a cascading render.
 */
const step: Record<QualityTier, QualityTier> = {
  high: "medium",
  medium: "low",
  low: "low",
  none: "none",
};

let current: QualityTier | null = null;
let initial: QualityTier | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): QualityTier {
  if (current === null) {
    current = resolveQualityTier();
    initial = current;
  }
  return current;
}

/**
 * The tier the device was first judged to be, before any runtime degrade.
 *
 * Context-creation attributes such as antialiasing cannot be changed once the
 * WebGL context exists, so they have to be chosen from a value that never moves.
 */
export function initialQualityTier(): QualityTier {
  getSnapshot();
  return initial ?? "none";
}

/** No viewport, no GPU: the server always renders the page without a canvas. */
function getServerSnapshot(): QualityTier {
  return "none";
}

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

/** Drops one tier. Called by the frame-rate guard, at most once per tier. */
export function degradeQuality(): void {
  const next = step[getSnapshot()];
  if (next === current) return;

  current = next;
  listeners.forEach((listener) => listener());
}

export function useQualityTier(): QualityTier {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
