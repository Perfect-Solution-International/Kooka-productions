"use client";

import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function KookaShowreel() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    if (videoRef.current) videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "160px 0px" },
    );
    observer.observe(preview);

    return () => observer.disconnect();
  }, []);

  return (
    <Section id="kooka-showreel" full density="tight" className="overflow-hidden py-6 sm:py-8 md:py-10">
      <Reveal className="w-full">
        <div ref={previewRef} className="group relative aspect-video max-h-[65vh] w-full overflow-hidden bg-kooka-void sm:aspect-[16/8] lg:aspect-[16/7]">
          {isVisible ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
              poster="/media/kooka-showreel-poster.jpg"
              className="size-full object-cover"
            >
              <source src="/media/kooka-showreel.mp4" type="video/mp4" />
            </video>
          ) : (
            <Image
              src="/media/kooka-showreel-poster.jpg"
              alt="Kooka Productions showreel"
              fill
              sizes="(min-width: 1280px) 1180px, (min-width: 640px) 90vw, 100vw"
              className="object-cover"
            />
          )}
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-t from-kooka-void/60 via-transparent to-transparent" />
          <span className="pointer-events-none absolute bottom-5 left-5 font-display text-[0.65rem] tracking-[0.28em] text-kooka-white/85 uppercase sm:bottom-7 sm:left-8 sm:text-xs">Kooka in motion</span>
          <button
            type="button"
            onClick={toggleMute}
            className="absolute right-5 bottom-4 grid size-10 place-items-center rounded-full border border-white/30 bg-kooka-void/55 text-kooka-white backdrop-blur-sm transition-colors hover:border-kooka-amber hover:bg-kooka-amber hover:text-kooka-void focus-visible:ring-2 focus-visible:ring-kooka-amber sm:right-8 sm:bottom-6 sm:size-11"
            aria-label={isMuted ? "Turn on showreel sound" : "Mute showreel sound"}
            aria-pressed={!isMuted}
          >
            {isMuted ? <VolumeX aria-hidden className="size-4" /> : <Volume2 aria-hidden className="size-4" />}
          </button>
        </div>
      </Reveal>
    </Section>
  );
}
