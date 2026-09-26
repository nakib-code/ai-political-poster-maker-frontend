"use client";

import Link from "next/link";
import { ArrowRight, LogIn, UserPlus, X } from "lucide-react";
import { useEffect } from "react";

interface HomeAuthModalProps {
  open: boolean;
  onClose: () => void;
  redirect?: string;
}

export default function HomeAuthModal({
  open,
  onClose,
  redirect = "/dashboard/templates",
}: HomeAuthModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const encodedRedirect = encodeURIComponent(redirect);

  const loginUrl = `/login?redirect=${encodedRedirect}`;
  const registerUrl = `/register?redirect=${encodedRedirect}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/50">
        {/* Glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[70px]" />

        <div className="relative p-6 sm:p-8">
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
            <span className="text-lg">✨</span>
          </div>

          {/* Heading */}
          <div className="mt-5 pr-8">
            <h2
              id="auth-modal-title"
              className="text-2xl font-black tracking-tight text-white"
            >
              Get started with PosterMaker
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Sign in to your account or create a new
              account to start creating posters.
            </p>
          </div>

          {/* Options */}
          <div className="mt-7 space-y-3">
            <Link
              href={loginUrl}
              onClick={onClose}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <LogIn className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white">
                  Sign In
                </p>

                <p className="mt-0.5 text-xs text-slate-600">
                  Already have an account?
                </p>
              </div>

              <ArrowRight className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-emerald-400" />
            </Link>

            <Link
              href={registerUrl}
              onClick={onClose}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <UserPlus className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white">
                  Create Account
                </p>

                <p className="mt-0.5 text-xs text-slate-600">
                  New to PosterMaker?
                </p>
              </div>

              <ArrowRight className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-emerald-400" />
            </Link>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-white/[0.03] hover:text-slate-300"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}