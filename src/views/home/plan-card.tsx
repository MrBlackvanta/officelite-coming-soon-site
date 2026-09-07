import { CtaLink } from "@/components/ui";
import type { Plan } from "@/data";
import { cn } from "@/lib";

import { PlanPrice } from "./plan-price";

type PlanCardProps = {
  plan: Plan;
};

export function PlanCard({ plan }: PlanCardProps) {
  const { name, price, note, features, featured } = plan;

  return (
    <li
      className={cn(
        "rounded-card shadow-card relative flex flex-col px-6 py-10 text-center md:flex-row md:px-12 md:py-12 md:text-left lg:flex-col lg:px-6 lg:py-10 lg:text-center",
        featured
          ? "bg-brand text-surface isolate overflow-clip"
          : "bg-surface text-ink",
      )}
    >
      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-15.25 left-1/2 -z-10 size-220 -translate-x-1/2 -translate-y-1/2 bg-[url(/bg-pattern-pricing.svg)] bg-cover md:top-1/2 md:left-30.25 lg:top-15.25 lg:left-1/2"
        />
      )}
      <div className="contents md:block md:w-88 lg:contents">
        <h3 className="text-h2 font-bold">{name}</h3>
        <PlanPrice
          price={price}
          className="text-display mt-10 font-bold md:mt-4 lg:mt-10"
        />
        <p className="text-body mt-2 md:mt-1 lg:mt-2">{note}</p>
        <CtaLink
          href="/sign-up"
          variant={featured ? "plain" : "ghost"}
          className="order-1 mx-auto mt-8 md:mt-6 lg:mt-8"
        >
          Try for Free
        </CtaLink>
      </div>
      <ul
        role="list"
        className={cn(
          "text-body mt-14 space-y-4 md:mt-11 lg:mt-14",
          !featured && "text-muted",
        )}
      >
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </li>
  );
}
