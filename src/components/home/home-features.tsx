import {
  Download,
  ImagePlus,
  LayoutTemplate,
  WandSparkles,
} from "lucide-react";

const features = [
  {
    icon: WandSparkles,
    title: "AI-Assisted Layout",
    description:
      "Get an automatically arranged layout based on your selected template and content.",
  },
  {
    icon: ImagePlus,
    title: "Upload Your Photos",
    description:
      "Upload up to three photos and place them naturally within supported layouts.",
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

export default function HomeFeatures() {
  return (
    <section
      id="features"
      className="border-t border-white/5 bg-slate-950/80"
    >
      <div className="py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-400">
            Features
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Everything you need to create a poster.
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
            A simple workflow designed to help you move from content to
            finished poster quickly.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="card card-hover p-6"
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
  );
}