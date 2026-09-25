"use client";

import { LogOut, Menu, UserCircle } from "lucide-react";
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
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-white">
              {userName}
            </p>
            <p className="text-xs text-slate-500">
              Poster Creator
            </p>
          </div>

          <UserCircle className="h-9 w-9 text-slate-400" />

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}