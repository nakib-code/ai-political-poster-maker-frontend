import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function HomeFooter() {
  return (
    <footer className="border-t border-white/5">
      <div className="page-container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
              <Sparkles className="h-4 w-4 text-emerald-400" />
            </div>

            <span className="text-sm font-bold text-white">
              PosterMaker AI
            </span>
          </Link>

          <p className="mt-2 text-xs text-slate-600">
            AI-assisted poster creation platform.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600">
          <Link href="#features" className="transition hover:text-slate-300">
            Features
          </Link>

          <Link
            href="#how-it-works"
            className="transition hover:text-slate-300"
          >
            How It Works
          </Link>

          <Link href="#templates" className="transition hover:text-slate-300">
            Templates
          </Link>

          <Link href="/login" className="transition hover:text-slate-300">
            Login
          </Link>
        </nav>
      </div>

      <div className="border-t border-white/5">
        <div className="page-container py-5 text-center text-xs text-slate-700">
          © {new Date().getFullYear()} PosterMaker AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}