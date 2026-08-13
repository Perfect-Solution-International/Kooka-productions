"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { img, showreelVideo } from "@/data/media";
import { EASE_KOOKA } from "@/lib/motion";
import { cn } from "@/lib/utils";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function ReelPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  /** The master file is a drop-in slot; until it exists we show the poster. */
  const [sourceMissing, setSourceMissing] = useState(false);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || sourceMissing) return;

    if (video.paused) {
      void video.play().then(
        () => setPlaying(true),
        () => setSourceMissing(true),
      );
    } else {
      video.pause();
      setPlaying(false);
      setControlsVisible(true);
    }
  }, [sourceMissing]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTime = () => setProgress(video.currentTime);
    const onLoaded = () => setDuration(video.duration);
    const onEnded = () => {
      setPlaying(false);
      setControlsVisible(true);
    };
    const onError = () => setSourceMissing(true);

    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
    };
  }, []);

  // Controls fade out after a quiet moment of uninterrupted playback.
  useEffect(() => {
    if (!playing || !controlsVisible) return;
    const timer = window.setTimeout(() => setControlsVisible(false), 2600);
    return () => window.clearTimeout(timer);
  }, [playing, controlsVisible]);

  function seek(event: React.ChangeEvent<HTMLInputElement>) {
    const video = videoRef.current;
    if (!video) return;
    const next = Number(event.target.value);
    video.currentTime = next;
    setProgress(next);
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function restart() {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setProgress(0);
  }

  function goFullscreen() {
    void videoRef.current?.requestFullscreen?.();
  }

  const played = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="relative isolate">
      {/* Ambient glow backing */}
      <div
        aria-hidden
        className="kooka-bloom top-1/4 left-1/2 h-[30rem] w-[80%] -translate-x-1/2 animate-glow-pulse"
      />

      <div
        onMouseMove={() => setControlsVisible(true)}
        className="group relative aspect-video overflow-hidden rounded-3xl border border-white/[0.09] bg-kooka-void shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]"
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={img(showreelVideo.poster, 2000, 82)}
          playsInline
          muted={muted}
          preload="metadata"
        >
          <source src={showreelVideo.src} type="video/mp4" />
        </video>

        {/* Centre play control */}
        <AnimatePresence>
          {!playing ? (
            <motion.button
              type="button"
              onClick={togglePlay}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASE_KOOKA }}
              aria-label={sourceMissing ? "Reel unavailable" : "Play showreel"}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-kooka-void/45 backdrop-blur-[2px]"
            >
              <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full border border-kooka-amber/50 bg-kooka-amber/15 text-kooka-amber transition-all duration-500 hover:bg-kooka-amber hover:text-kooka-black sm:h-24 sm:w-24">
                <span
                  aria-hidden
                  className="absolute inset-0 animate-glow-pulse rounded-full bg-kooka-amber/25 blur-xl"
                />
                <Play className="relative h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden />
              </span>
              <span className="font-display text-xs tracking-[0.28em] uppercase">
                {sourceMissing ? "Reel coming soon" : "Play the reel"}
              </span>
            </motion.button>
          ) : null}
        </AnimatePresence>

        {/* Control bar */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-kooka-void via-kooka-void/70 to-transparent px-5 pt-16 pb-5 transition-opacity duration-500 sm:px-8 sm:pb-7",
            controlsVisible ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="relative mb-4">
            <div
              aria-hidden
              className="h-1 w-full overflow-hidden rounded-full bg-white/15"
            >
              <div
                className="h-full rounded-full bg-kooka-amber transition-[width] duration-150"
                style={{ width: `${played}%` }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={progress}
              onChange={seek}
              aria-label="Seek"
              disabled={sourceMissing || duration === 0}
              className="absolute inset-x-0 -top-2 h-5 w-full cursor-pointer opacity-0"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-kooka-white transition-colors duration-300 hover:border-kooka-amber/60 hover:text-kooka-amber"
              >
                {playing ? (
                  <Pause className="h-4 w-4" aria-hidden />
                ) : (
                  <Play className="h-4 w-4 fill-current" aria-hidden />
                )}
              </button>
              <button
                type="button"
                onClick={restart}
                aria-label="Restart"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-kooka-white transition-colors duration-300 hover:border-kooka-amber/60 hover:text-kooka-amber"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-kooka-white transition-colors duration-300 hover:border-kooka-amber/60 hover:text-kooka-amber"
              >
                {muted ? (
                  <VolumeX className="h-4 w-4" aria-hidden />
                ) : (
                  <Volume2 className="h-4 w-4" aria-hidden />
                )}
              </button>
              <span className="ml-2 font-display text-xs tracking-[0.18em] text-kooka-mist tabular-nums">
                {formatTime(progress)} / {formatTime(duration)}
              </span>
            </div>

            <button
              type="button"
              onClick={goFullscreen}
              aria-label="Fullscreen"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-kooka-white transition-colors duration-300 hover:border-kooka-amber/60 hover:text-kooka-amber"
            >
              <Maximize2 className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        {/* Poster fallback while the master file is not in place */}
        {sourceMissing ? (
          <Image
            src={img(showreelVideo.poster, 2000, 82)}
            alt="Kooka Productions showreel"
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover"
          />
        ) : null}
      </div>
    </div>
  );
}
