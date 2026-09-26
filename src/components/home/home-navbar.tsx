"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

import HomeAuthModal from "@/components/home/home-auth-modal";

export default function HomeNavbar() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/85 backdrop-blur-xl">
        <div className="page-container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
              <Sparkles className="h-4 w-4 text-emerald-400" />
            </div>

            <div>
              <span className="text-sm font-bold tracking-tight text-white sm:text-base">
                PosterMaker
              </span>

              <span className="ml-1.5 hidden text-xs text-slate-600 sm:inline">
                AI
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              Features
            </Link>

            <Link
              href="#how-it-works"
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              How It Works
            </Link>

            <Link
              href="#templates"
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              Templates
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden px-3 py-2 text-sm font-semibold text-slate-300 transition hover:text-white sm:block"
            >
              Login
            </Link>

            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="btn btn-primary btn-sm"
            >
              <span className="hidden sm:inline">
                Get Started
              </span>

              <span className="sm:hidden">
                Start
              </span>

              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <HomeAuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </>
  );
}