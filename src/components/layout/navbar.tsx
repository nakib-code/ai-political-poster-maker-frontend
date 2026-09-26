"use client";

import {
  LogOut,
  Menu,
  UserCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  onMenuClick?: () => void;
  userName?: string;
}

export default function Navbar({
  onMenuClick,
  userName = "User",
}: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-white lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Desktop workspace label */}
        <div className="hidden lg:block">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
            Workspace
          </p>

          <p className="mt-0.5 text-sm font-semibold text-slate-300">
            Poster Maker
          </p>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* User */}
          <div className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] px-2.5 py-1.5 sm:px-3">
            <div className="hidden text-right sm:block">
              <p className="max-w-36 truncate text-sm font-semibold text-white">
                {userName}
              </p>

              <p className="text-[11px] text-slate-500">
                Poster Creator
              </p>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
              <UserCircle className="h-5 w-5 text-emerald-400" />
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Logout"
            title="Logout"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 text-slate-500 transition hover:border-red-500/10 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}