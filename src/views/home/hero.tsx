import { CtaLink } from "@/components/ui";

export function Hero() {
  return (
    <section className="v-shell pt-20 md:pt-26 xl:pt-25.5">
      <div className="flex flex-col-reverse gap-16 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="text-center md:basis-1/2 md:text-left xl:basis-[48.75%]">
          <h1 className="text-h1 text-ink xl:text-display font-bold">
            A simple solution to complex tasks is coming soon
          </h1>
          <p className="text-lead-sm text-muted xl:text-lead mt-6">
            Say goodbye to inefficient juggling of multiple apps, teams, and
            projects. Officelite is the new collaboration platform built with an
            intuitive interface to improve productivity.
          </p>
          <CtaLink
            href="/sign-up"
            variant="solid"
            className="shadow-cta mt-6 xl:mt-8"
          >
            Get Started
          </CtaLink>
        </div>
        <div className="relative mx-auto aspect-475/531 w-[52.3%] md:mx-0 md:basis-[40.75%] xl:basis-[42.75%]">
          <img
            src="/illustration-charts.svg"
            alt=""
            width={525}
            height={606}
            fetchPriority="high"
            className="absolute top-0 left-1/2 h-auto w-[110.5263%] max-w-none -translate-x-1/2"
          />
        </div>
      </div>
    </section>
  );
}
