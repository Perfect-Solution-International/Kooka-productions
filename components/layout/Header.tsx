"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { mainNav } from "@/data/navigation";
import { contact, site } from "@/data/site";
import { EASE_KOOKA } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  // Lock background scroll while the sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "border-b border-white/[0.07] bg-kooka-black/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "kooka-container flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled ? "h-16 lg:h-18" : "h-20 lg:h-24",
          )}
        >
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="shrink-0 transition-opacity duration-300 hover:opacity-80"
          >
            <Wordmark className="text-base lg:text-lg" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 font-display text-[0.72rem] font-medium tracking-[0.16em] uppercase transition-colors duration-300",
                      isActive(item.href)
                        ? "text-kooka-amber"
                        : "text-kooka-mist hover:text-kooka-white",
                    )}
                  >
                    {item.label}
                    {isActive(item.href) ? (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ duration: 0.5, ease: EASE_KOOKA }}
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-kooka-amber"
                      />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-2 text-sm text-kooka-mist transition-colors duration-300 hover:text-kooka-white"
            >
              <Phone className="h-4 w-4 text-kooka-amber" aria-hidden />
              {contact.phone}
            </a>
            <ButtonLink href={contact.quoteHref} size="sm">
              Get a Quote
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-kooka-white backdrop-blur-md transition-colors duration-300 hover:border-kooka-amber/50 hover:text-kooka-amber lg:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_KOOKA }}
            className="fixed inset-0 z-40 bg-kooka-void/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="kooka-container flex h-full flex-col justify-between pt-28 pb-12">
              <nav aria-label="Mobile">
                <ul className="flex flex-col">
                  {mainNav.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.06 * index,
                        duration: 0.5,
                        ease: EASE_KOOKA,
                      }}
                      className="border-b border-white/[0.07]"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "flex flex-col gap-1 py-5",
                          isActive(item.href)
                            ? "text-kooka-amber"
                            : "text-kooka-white",
                        )}
                      >
                        <span className="kooka-display text-3xl">
                          {item.label}
                        </span>
                        {item.description ? (
                          <span className="text-sm text-kooka-muted">
                            {item.description}
                          </span>
                        ) : null}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.5, ease: EASE_KOOKA }}
                // Either action leaves the sheet, so dismiss it on tap.
                onClick={() => setMenuOpen(false)}
                className="flex flex-col gap-4"
              >
                <ButtonLink href={contact.quoteHref} size="lg" className="w-full">
                  Get a Quote
                </ButtonLink>
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center justify-center gap-2 text-sm text-kooka-mist"
                >
                  <Phone className="h-4 w-4 text-kooka-amber" aria-hidden />
                  {contact.phone}
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
