import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ImagePlus,
  LayoutTemplate,
  Sparkles,
  Download,
  WandSparkles,
} from "lucide-react";

const features = [
  {
    icon: WandSparkles,
    title: "AI-Assisted Layout",
    description:
      "Get an automatically arranged poster layout based on your selected template and content.",
  },
  {
    icon: ImagePlus,
    title: "Upload Your Photos",
    description:
      "Upload up to three photos and place them naturally within supported poster layouts.",
  },
  {
    icon: LayoutTemplate,
    title: "Ready Templates",
    description:
      "Start quickly with professionally structured templates for different occasions.",
  },
  {
    icon: Download,
    title: "PNG Export",
    description:
      "Preview your generated poster and export the final design as a PNG image.",
  },
];

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
      "Enter your information, headline, location and upload photos.",
  },
  {
    number: "03",
    title: "Generate & Download",
    description:
      "Generate the poster, review it, regenerate if needed and download the PNG.",
  },
];

const occasions = [
  "Victory Day",
  "Condolence",
  "Campaign",
  "Greetings",
  "Festival",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
              <Sparkles className="h-4.5 w-4.5 text-emerald-400" />
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

          {/* Desktop Navigation */}
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

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden px-3 py-2 text-sm font-semibold text-slate-300 transition hover:text-white sm:block"
            >
              Login
            </Link>

            <Link
              href="/dashboard/templates"
              className="btn btn-primary btn-sm"
            >
              <span className="hidden sm:inline">
                Get Started
              </span>

              <span className="sm:hidden">
                Start
              </span>

              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 top-40 h-80 w-80 rounded-full bg-cyan-500/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Assisted Poster Creation
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl lg:leading-[1.05]">
              Create professional
              <span className="block bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                posters in minutes.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Choose a template, add your information and
              photos, then let our AI-assisted system
              help arrange your poster design.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/dashboard/templates"
                className="btn btn-primary btn-lg"
              >
                Create a Poster
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="#templates"
                className="btn btn-secondary btn-lg"
              >
                Explore Templates
              </Link>
            </div>

            {/* Trust points */}
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

          {/* Hero mockup */}
          <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
            <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 p-2 shadow-2xl shadow-emerald-950/20">
              <div className="rounded-xl border border-white/5 bg-slate-950 p-4 sm:p-6">
                {/* Fake browser header */}
                <div className="mb-5 flex items-center gap-2 border-b border-white/5 pb-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />

                  <div className="ml-3 h-7 flex-1 rounded-lg bg-slate-900" />
                </div>

                {/* Mock dashboard */}
                <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
                  <div className="hidden rounded-xl border border-white/5 bg-slate-900 p-4 sm:block">
                    <div className="mb-5 h-7 w-24 rounded bg-emerald-500/10" />

                    <div className="space-y-3">
                      <div className="h-8 rounded-lg bg-emerald-500/10" />
                      <div className="h-8 rounded-lg bg-slate-800" />
                      <div className="h-8 rounded-lg bg-slate-800" />
                      <div className="h-8 rounded-lg bg-slate-800" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-slate-900 p-4 sm:p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <div className="h-5 w-36 rounded bg-slate-700" />
                        <div className="mt-2 h-3 w-52 rounded bg-slate-800" />
                      </div>

                      <div className="h-9 w-28 rounded-lg bg-emerald-500/20" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="aspect-[4/5] rounded-xl border border-emerald-500/10 bg-gradient-to-br from-emerald-950 to-slate-800 p-3">
                        <div className="h-1/2 rounded-lg bg-emerald-500/10" />
                        <div className="mx-auto mt-4 h-4 w-2/3 rounded bg-white/10" />
                        <div className="mx-auto mt-2 h-3 w-1/2 rounded bg-white/5" />
                      </div>

                      <div className="aspect-[4/5] rounded-xl border border-white/5 bg-slate-800 p-3">
                        <div className="h-1/2 rounded-lg bg-slate-700" />
                        <div className="mx-auto mt-4 h-4 w-2/3 rounded bg-white/10" />
                        <div className="mx-auto mt-2 h-3 w-1/2 rounded bg-white/5" />
                      </div>

                      <div className="aspect-[4/5] rounded-xl border border-white/5 bg-slate-800 p-3">
                        <div className="h-1/2 rounded-lg bg-slate-700" />
                        <div className="mx-auto mt-4 h-4 w-2/3 rounded bg-white/10" />
                        <div className="mx-auto mt-2 h-3 w-1/2 rounded bg-white/5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-white/5 bg-slate-950/80"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-400">
              Features
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Everything you need to create a poster.
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              A simple workflow designed to help you
              move from idea to finished poster quickly.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="card-hover rounded-2xl border border-white/5 bg-slate-900/60 p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/10">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 font-bold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-t border-white/5"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-400">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              From template to poster in three steps.
            </h2>
          </div>

          <div className="relative mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative text-center"
              >
                {index < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+60px)] right-[calc(-50%+60px)] top-7 hidden h-px bg-gradient-to-r from-emerald-500/30 to-transparent md:block" />
                )}

                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/15 bg-emerald-500/5 text-sm font-black text-emerald-400">
                  {step.number}
                </div>

                <h3 className="mt-5 font-bold text-white">
                  {step.title}
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section
        id="templates"
        className="border-t border-white/5 bg-slate-950/80"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-400">
                Templates
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Start with a ready-made layout.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Select a supported occasion and customize
                the poster with your own information and
                photos.
              </p>
            </div>

            <Link
              href="/dashboard/templates"
              className="btn btn-outline btn-sm self-start sm:self-auto"
            >
              View All Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.slice(0, 3).map(
              (occasion, index) => (
                <div
                  key={occasion}
                  className="group overflow-hidden rounded-2xl border border-white/5 bg-slate-900"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950">
                    <div
                      className={`absolute inset-6 rounded-xl border border-white/5 ${
                        index === 0
                          ? "bg-gradient-to-br from-emerald-950 to-slate-800"
                          : index === 1
                            ? "bg-gradient-to-br from-slate-700 to-slate-950"
                            : "bg-gradient-to-br from-blue-950 to-slate-900"
                      }`}
                    >
                      <div className="flex h-full flex-col items-center justify-center p-5 text-center">
                        <div className="h-20 w-20 rounded-full bg-white/5" />

                        <div className="mt-4 h-3 w-28 rounded bg-white/10" />

                        <div className="mt-2 h-2 w-20 rounded bg-white/5" />
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900 to-transparent" />
                  </div>

                  <div className="flex items-center justify-between p-5">
                    <div>
                      <h3 className="font-bold text-white">
                        {occasion}
                      </h3>

                      <p className="mt-1 text-xs text-slate-600">
                        Ready-to-use template
                      </p>
                    </div>

                    <Link
                      href="/dashboard/templates"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 text-slate-400 transition hover:border-emerald-500/20 hover:text-emerald-400"
                      aria-label={`View ${occasion} templates`}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/10 bg-emerald-500/5 px-6 py-14 sm:px-10">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[80px]" />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <Sparkles className="h-5 w-5" />
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Ready to create your poster?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Choose a template and start creating
                your next poster with a simple,
                AI-assisted workflow.
              </p>

              <Link
                href="/dashboard/templates"
                className="btn btn-primary btn-lg mt-7"
              >
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2"
            >
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

          <div className="flex items-center gap-5 text-xs text-slate-600">
            <Link
              href="#features"
              className="transition hover:text-slate-300"
            >
              Features
            </Link>

            <Link
              href="#how-it-works"
              className="transition hover:text-slate-300"
            >
              How It Works
            </Link>

            <Link
              href="/login"
              className="transition hover:text-slate-300"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="border-t border-white/5">
          <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-slate-700 sm:px-6 lg:px-8">
            © {new Date().getFullYear()} PosterMaker AI.
            All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}