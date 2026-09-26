import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HomeCTA() {
  return (
    <section className="border-t border-white/5">
      <div className="py-20 text-center">
        <div className="card relative overflow-hidden border-emerald-500/10 bg-emerald-500/5 px-6 py-14 sm:px-10">
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[80px]" />

          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <Sparkles className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Ready to create your poster?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Choose a template and start creating with a simple, AI-assisted
              workflow.
            </p>

            <Link
              href="/login?redirect=/dashboard/templates"
              className="btn btn-primary btn-lg mt-7"
            >
              Start Creating
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}