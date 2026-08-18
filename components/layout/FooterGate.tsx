"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function FooterGate({ children }: { readonly children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return <>{children}</>;
}
