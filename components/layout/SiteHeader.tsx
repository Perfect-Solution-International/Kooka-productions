"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";

export function SiteHeader({ solutions }: { readonly solutions: readonly { slug: string; title: string }[] }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return <Header solutions={solutions} />;
}
