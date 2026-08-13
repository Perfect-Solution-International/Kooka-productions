"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Sticky jump pills with scroll-spy. The observer's root margin keeps the
 * "active" section aligned with what is actually under the fixed header.
 */
export function ServiceAnchorNav() {
  const [active, setActive] = useState(services[0].slug);
  const railRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = services
      .map((service) => document.getElementById(service.slug))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Keep the active pill in view on narrow screens.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const pill = rail.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    if (!pill) return;

    const offset =
      pill.offsetLeft - rail.clientWidth / 2 + pill.clientWidth / 2;
    rail.scrollTo({ left: Math.max(offset, 0), behavior: "smooth" });
  }, [active]);

  return (
    <div className="sticky top-16 z-30 border-y border-white/[0.07] bg-kooka-black/85 backdrop-blur-xl lg:top-18">
      <div className="kooka-container">
        <ul
          ref={railRef}
          className="no-scrollbar flex gap-2 overflow-x-auto py-4"
        >
          {services.map((service) => (
            <li key={service.slug} className="shrink-0">
              <a
                href={`#${service.slug}`}
                data-slug={service.slug}
                aria-current={active === service.slug ? "true" : undefined}
                className={cn(
                  "inline-flex items-center rounded-full border px-4 py-2 font-display text-[0.66rem] tracking-[0.16em] whitespace-nowrap uppercase transition-all duration-500",
                  active === service.slug
                    ? "border-kooka-amber/60 bg-kooka-amber/12 text-kooka-amber shadow-[0_0_26px_-10px_var(--color-kooka-amber)]"
                    : "border-white/10 bg-white/[0.03] text-kooka-mist hover:border-white/25 hover:text-kooka-white",
                )}
              >
                {service.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
