import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const createUrl = "/login?redirect=/dashboard/templates";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 top-40 h-80 w-80 rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="relative pb-20 pt-20 sm:pb-28 sm:pt-28 lg:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Assisted Poster Creation
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl lg:leading-[1.05]">
            Create professional
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              posters in minutes.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Choose a template, add your information and photos, then use our
            AI-assisted system to arrange your poster design.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={createUrl} className="btn btn-primary btn-lg">
              Create a Poster
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link href="#templates" className="btn btn-secondary btn-lg">
              Explore Templates
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Easy to use
            </span>

            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Bengali text support
            </span>

            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              PNG export
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}