"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SceneCanvas = dynamic(
  () => import("@/components/3d/SceneCanvas").then((module) => module.SceneCanvas),
  { ssr: false },
);

/**
 * WebGL is decorative, so it must not compete with the page's text, hero image
 * and navigation during the critical loading window.
 */
export function DeferredSceneCanvas() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (mobile || window.innerWidth < 768) return;

    const browser = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (browser.requestIdleCallback) {
      const handle = browser.requestIdleCallback(() => setReady(true), {
        timeout: 1800,
      });
      return () => browser.cancelIdleCallback?.(handle);
    }

    const handle = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(handle);
  }, []);

  return ready ? <SceneCanvas /> : null;
}
