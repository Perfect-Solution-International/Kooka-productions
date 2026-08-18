"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/*
 * Routes that own the full viewport and must not be followed by the footer.
 * The showreel index keeps its footer — only the per-project detail does not.
 */
const FOOTERLESS_ROUTES = [/^\/showreel\/[^/]+\/?$/];

export function FooterGate({ children }: { readonly children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const hidden = FOOTERLESS_ROUTES.some((route) => route.test(pathname));

  return hidden ? null : <>{children}</>;
}
