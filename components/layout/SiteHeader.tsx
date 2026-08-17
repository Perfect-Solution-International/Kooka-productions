"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";

/*
 * Routes that own the full viewport and render their own navigation affordance.
 * The showreel index keeps the header — only the per-project detail drops it.
 */
const HEADERLESS_ROUTES = [/^\/showreel\/[^/]+\/?$/];

export function SiteHeader() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  if (HEADERLESS_ROUTES.some((route) => route.test(pathname))) return null;

  return <Header />;
}
