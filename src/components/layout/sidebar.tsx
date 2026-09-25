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
      {open && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-slate-950 transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-2 text-lg font-black"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-sm text-slate-950">
              AI
            </span>

            <span>
              Poster<span className="text-emerald-400">Maker</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-600">
            Workspace
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 p-4">
          <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-3">
            <p className="text-xs font-semibold text-emerald-400">
              AI Assisted
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Create your poster with AI-assisted layouts.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}