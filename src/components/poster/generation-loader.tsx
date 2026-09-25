"use client";

import { Sparkles } from "lucide-react";

interface GenerationLoaderProps {
  message?: string;
}

export default function GenerationLoader({
  message = "Creating your poster...",
}: GenerationLoaderProps) {
  return (
    <div className="flex min-h-[500px] items-center justify-center px-6">
      <div className="text-center">
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-2xl bg-emerald-500/10" />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
            <Sparkles className="h-7 w-7 animate-pulse text-emerald-400" />
          </div>
        </div>

        <h2 className="mt-6 text-lg font-bold text-white">
          {message}
        </h2>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
          AI is preparing the layout and rendering
          your poster. This may take a moment.
        </p>

        <div className="mx-auto mt-5 flex w-40 items-center gap-1">
          <span className="h-1.5 flex-1 animate-pulse rounded-full bg-emerald-500/30" />

          <span className="h-1.5 flex-1 animate-pulse rounded-full bg-emerald-500/50 [animation-delay:150ms]" />

          <span className="h-1.5 flex-1 animate-pulse rounded-full bg-emerald-500/70 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}