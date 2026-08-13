"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { mainNav, type NavItem } from "@/data/navigation";
import { contact, site } from "@/data/site";
import { EASE_KOOKA } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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

  const isActive = (href: string) => {
    // Hash-only targets live on a page rather than owning a route.
    const [path] = href.split("#");
    if (!path || path === "/") return href === "/" && pathname === "/";
    return pathname.startsWith(path);
  };

  const hasActiveChild = (item: NavItem) =>
    item.children?.some((child) => isActive(child.href)) ?? false;

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
              {mainNav.map((item) => {
                const active = isActive(item.href) || hasActiveChild(item);
                const open = openDropdown === item.href;

                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() =>
                      item.children ? setOpenDropdown(item.href) : undefined
                    }
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={item.children ? open : undefined}
                      onFocus={() =>
                        setOpenDropdown(item.children ? item.href : null)
                      }
                      className={cn(
                        "relative flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-[0.72rem] font-medium tracking-[0.16em] uppercase transition-colors duration-300",
                        active
                          ? "text-kooka-amber"
                          : "text-kooka-mist hover:text-kooka-white",
                      )}
                    >
                      {item.label}
                      {item.children ? (
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-300",
                            open && "rotate-180",
                          )}
                          aria-hidden
                        />
                      ) : null}
                      {active ? (
                        <motion.span
                          layoutId="nav-active"
                          transition={{ duration: 0.5, ease: EASE_KOOKA }}
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-kooka-amber"
                        />
                      ) : null}
                    </Link>

                    {item.children ? (
                      <AnimatePresence>
                        {open ? (
                          <motion.ul
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.28, ease: EASE_KOOKA }}
                            // `before` bridges the 12px gap under the trigger so
                            // travelling into the panel does not fire mouseleave.
                            className="kooka-glass absolute top-full left-0 mt-3 w-[23rem] rounded-2xl p-3 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)] before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-['']"
                          >
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className="group/item flex items-center gap-3 rounded-xl px-4 py-3 font-display text-[0.72rem] font-semibold tracking-[0.16em] text-kooka-white uppercase transition-colors duration-300 hover:bg-white/[0.06] hover:text-kooka-amber"
                                >
                                  <span
                                    aria-hidden
                                    className="h-px w-0 bg-kooka-amber transition-all duration-300 group-hover/item:w-4"
                                  />
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        ) : null}
                      </AnimatePresence>
                    ) : null}
                  </li>
                );
              })}
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
            className="fixed inset-0 z-40 overflow-y-auto bg-kooka-void/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="kooka-container flex min-h-full flex-col justify-between gap-12 pt-28 pb-12">
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

                      {item.children ? (
                        <ul className="mb-5 flex flex-col gap-2 border-l border-kooka-amber/30 pl-4">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setMenuOpen(false)}
                                className={cn(
                                  "block font-display text-[0.72rem] tracking-[0.16em] uppercase transition-colors duration-300",
                                  isActive(child.href)
                                    ? "text-kooka-amber"
                                    : "text-kooka-mist hover:text-kooka-white",
                                )}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
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
