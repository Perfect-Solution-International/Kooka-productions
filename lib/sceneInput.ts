"use client";

/**
 * Scroll and pointer state for the 3D scene, held outside React.
 *
 * The camera reads this every frame inside `useFrame`. Routing it through
 * React state instead would re-render the scene graph on every scroll event and
 * every mouse move, which is precisely the cost the render loop exists to
 * avoid. Listeners are passive and reference counted, so the page carries them
 * only while a canvas is mounted.
 */
export type SceneInput = {
  /** Document scroll, 0 at the top and 1 at the bottom. */
  scroll: number;
  /** Pointer position, -1 to 1 on each axis, origin at the viewport centre. */
  pointerX: number;
  pointerY: number;
};

const input: SceneInput = { scroll: 0, pointerX: 0, pointerY: 0 };

let subscribers = 0;
let detach: (() => void) | null = null;

function readScroll() {
  const doc = document.documentElement;
  const travel = doc.scrollHeight - doc.clientHeight;

  input.scroll = travel > 0 ? Math.min(1, Math.max(0, window.scrollY / travel)) : 0;
}

function readPointer(event: PointerEvent) {
  input.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
  input.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
}

export function attachSceneInput(): () => void {
  subscribers += 1;

  if (subscribers === 1) {
    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll, { passive: true });

    /*
     * Only a device that can hover has a resting pointer position. On touch,
     * `pointermove` fires during a drag, which would jerk the camera sideways
     * every time the page is scrolled with a finger.
     */
    const hoverable = window.matchMedia("(hover: hover)").matches;
    if (hoverable) {
      window.addEventListener("pointermove", readPointer, { passive: true });
    }

    detach = () => {
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
      if (hoverable) window.removeEventListener("pointermove", readPointer);
    };
  }

  return () => {
    subscribers -= 1;
    if (subscribers === 0) {
      detach?.();
      detach = null;
    }
  };
}

export function readSceneInput(): Readonly<SceneInput> {
  return input;
}
