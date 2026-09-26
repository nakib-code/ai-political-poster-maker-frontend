"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderOpen,
  Home,
  ImagePlus,
  LayoutTemplate,
  X,
} from "lucide-react";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Create Poster",
    href: "/dashboard/create",
    icon: ImagePlus,
  },
  {
    label: "Templates",
    href: "/dashboard/templates",
    icon: LayoutTemplate,
  },
  {
    label: "My Posters",
    href: "/dashboard/posters",
    icon: FolderOpen,
  },
];

export default function Sidebar({
  open = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-64 flex-col
          border-r border-white/10
          bg-slate-950
          shadow-2xl shadow-black/30
          transition-transform duration-200 ease-out
          lg:z-40 lg:translate-x-0
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/10">
              AI
            </span>

            <span className="text-lg font-black tracking-tight text-white">
              Poster
              <span className="text-emerald-400">
                Maker
              </span>
            </span>
          </Link>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
            Workspace
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              const active =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    group flex items-center gap-3
                    rounded-xl px-3 py-2.5
                    text-sm font-semibold
                    transition-all duration-200
                    ${
                      active
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  <span
                    className={`
                      flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                      transition-colors
                      ${
                        active
                          ? "bg-emerald-500/10"
                          : "bg-transparent group-hover:bg-white/5"
                      }
                    `}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom info */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.04] p-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10">
                <span className="text-[10px] font-black text-emerald-400">
                  AI
                </span>
              </div>

              <p className="text-xs font-bold text-emerald-400">
                AI Assisted
              </p>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Create professional posters with
              AI-assisted layouts.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}