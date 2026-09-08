import { Signature } from "@/components/layout";
import { Countdown, CtaLink, LaunchDate } from "@/components/ui";
import { buildTime } from "@/lib";

export function LaunchFooter() {
  return (
    <footer className="relative mt-25 lg:mt-20.5">
      <div
        aria-hidden="true"
        className="bg-night pointer-events-none absolute inset-x-0 -top-223.5 bottom-0 overflow-clip md:-top-149.5 lg:-top-84"
      >
        <div className="absolute top-189.25 left-1/2 size-300.5 -translate-x-1/2 -translate-y-1/2 bg-[url(/bg-pattern-footer.svg)] bg-cover md:top-185.5 md:size-363.5 lg:top-101 lg:left-79 lg:size-509" />
      </div>
      <div className="v-shell relative pb-25 lg:flex lg:items-center lg:justify-between lg:pb-22.75">
        <div className="text-center lg:text-left">
          <h2 className="text-eyebrow text-surface">
            Coming <LaunchDate renderedAt={buildTime} />
          </h2>
          <Countdown
            renderedAt={buildTime}
            tone="dark"
            className="mt-4.5 md:mt-2 lg:mt-0 lg:justify-start"
          />
        </div>
        <CtaLink
          href="/sign-up"
          variant="solid"
          className="outline-surface mx-auto mt-10 flex md:mt-12 lg:mx-0 lg:mt-0"
        >
          Get Started
        </CtaLink>
      </div>
      <Signature />
    </footer>
  );
}
