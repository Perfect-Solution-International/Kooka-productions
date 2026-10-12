"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function ShowreelHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const reduceMotion = useReducedMotion();

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    const enableSound = video.muted;
    video.muted = !enableSound;
    setSoundOn(enableSound);

    if (enableSound) {
      video.play().catch(() => {
        video.muted = true;
        setSoundOn(false);
      });
    }
  };

  if (reduceMotion) return null;

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/media/kooka-showreel-poster.jpg"
        aria-label="Kooka Productions showreel"
        width={1280}
        height={720}
        className="absolute inset-0 -z-20 size-full object-contain object-center"
      >
        <source src="/media/kooka-showreel.mp4" type="video/mp4" />
        Your browser does not support embedded video.
      </video>
      <button
        type="button"
        onClick={toggleSound}
        className="absolute right-5 bottom-4 z-10 grid size-10 place-items-center rounded-full border border-white/30 bg-kooka-void/55 text-kooka-white backdrop-blur-sm transition-colors hover:border-kooka-amber hover:bg-kooka-amber hover:text-kooka-void focus-visible:ring-2 focus-visible:ring-kooka-amber sm:right-8 sm:bottom-6 sm:size-11"
        aria-label={soundOn ? "Mute showreel sound" : "Turn on showreel sound"}
        aria-pressed={soundOn}
      >
        {soundOn ? (
          <Volume2 aria-hidden className="size-4" />
        ) : (
          <VolumeX aria-hidden className="size-4" />
        )}
      </button>
    </>
  );
}
