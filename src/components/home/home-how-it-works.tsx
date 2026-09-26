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
      "Generate the poster, review it and download the PNG.",
  },
];

export default function HomeHowItWorks() {
  return (
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
  );
}