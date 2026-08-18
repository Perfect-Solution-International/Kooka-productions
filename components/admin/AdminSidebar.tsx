"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Clapperboard, ExternalLink, LogOut, Users, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  readonly href: string;
  readonly label: string;
  readonly icon: LucideIcon;
};

const NAV_ITEMS: readonly NavItem[] = [
  { href: "/admin/projects", label: "Projects", icon: Clapperboard },
  { href: "/admin/users", label: "Users", icon: Users },
];

type AdminSidebarProps = {
  /** Mobile only — the drawer is always visible from `lg` upwards. */
  readonly open: boolean;
  readonly onClose: () => void;
};

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <>
      {/*
        Backdrop for the mobile drawer. Rendered unconditionally so the fade
        runs in both directions instead of only on open.
      */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/70 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full w-64 shrink-0 flex-col border-r border-white/10 bg-kooka-carbon transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <span className="font-display text-sm uppercase tracking-[0.18em] text-kooka-white">
            Kooka Admin
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-1 text-kooka-mist hover:text-kooka-amber lg:hidden"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-kooka-amber/10 text-kooka-amber"
                        : "text-kooka-mist hover:bg-white/[0.04] hover:text-kooka-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0 space-y-1 border-t border-white/10 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-kooka-mist transition-colors hover:bg-white/[0.04] hover:text-kooka-white"
          >
            <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
            View Site
          </Link>
          <button
            type="button"
            onClick={() => void handleLogout()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-kooka-mist transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-4 w-4 shrink-0" aria-hidden />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
