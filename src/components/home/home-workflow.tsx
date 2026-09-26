import Link from "next/link";
import { ArrowRight, WandSparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose a Template",
    description:
      "Select a poster template that matches your occasion.",
  },
  {
    number: "02",
    title: "Add Your Content",
    description:
      "Enter your information, headline, location and photos.",
  },
  {
    number: "03",
    title: "Generate & Download",
    description:
      "Generate, review, regenerate if needed and download.",
  },
];

export default function HomeWorkflow() {
  return (
    <section className="relative pb-20 sm:pb-28">
      <div>
        <div className="card-soft p-2 shadow-2xl shadow-emerald-950/20">
          <div className="card bg-slate-950 p-6 sm:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                <WandSparkles className="h-7 w-7 text-emerald-400" />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
                Simple workflow
              </p>

              <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                From idea to finished poster
              </h2>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                Everything happens in one simple workflow. Choose, customize,
                generate and export.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="card-soft bg-white/[0.02] p-5 text-left"
                  >
                    <span className="text-xs font-black text-emerald-400">
                      {step.number}
                    </span>

                    <p className="mt-3 text-sm font-bold text-white">
                      {step.title}
                    </p>

                    <p className="mt-1.5 text-xs leading-5 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/login?redirect=/dashboard/templates"
                className="btn btn-primary mt-8"
              >
                Start Creating
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}