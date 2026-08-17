import { ArrowLeft, Home, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden bg-kooka-void px-5 py-28 sm:px-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,176,32,0.13),transparent_34%)]"
        aria-hidden="true"
      />
      <div
        className="kooka-bloom top-1/2 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 opacity-30 sm:h-[34rem] sm:w-[34rem]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-kooka-amber/30 bg-kooka-amber/10 text-kooka-amber">
          <Sparkles className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="kooka-eyebrow mb-5">Signal Lost</p>
        <p
          className="font-display text-[clamp(6rem,24vw,14rem)] leading-[0.72] font-bold tracking-[-0.08em] text-kooka-white"
          aria-hidden="true"
        >
          404
        </p>
        <h1 className="kooka-display mt-10 text-[clamp(2rem,7vw,4.5rem)]">
          This Stage Is Dark
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-kooka-mist sm:text-lg">
          The page you are looking for has moved, finished its run, or never
          made it onto the production schedule.
        </p>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/" size="lg">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back Home
          </ButtonLink>
          <ButtonLink href="/showreel" variant="secondary" size="lg">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            View Showreel
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
