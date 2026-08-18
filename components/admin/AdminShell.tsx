"use client";

import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

type AdminShellProps = {
  readonly title: string;
  readonly children: ReactNode;
};

/*
 * Dashboard frame: the viewport is the frame. Nothing here scrolls — the
 * height is pinned to the visual viewport and clipped, so any pane that
 * overflows must own its own scroll container.
 */
export function AdminShell({ title, children }: AdminShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-kooka-black text-kooka-white">
      <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-white/10 px-5">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="rounded-lg p-1.5 text-kooka-mist hover:text-kooka-amber lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
          <h1 className="font-display text-lg text-kooka-white">{title}</h1>
        </header>

        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
