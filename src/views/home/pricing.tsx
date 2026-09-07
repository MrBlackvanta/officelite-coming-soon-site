import { plans } from "@/data";

import { PlanCard } from "./plan-card";

export function Pricing() {
  return (
    <section
      aria-labelledby="pricing-title"
      className="v-shell relative z-10 mt-25 md:mt-35 xl:mt-46"
    >
      <h2 id="pricing-title" className="sr-only">
        Pricing
      </h2>
      <ul role="list" className="grid gap-8 md:gap-6 lg:grid-cols-3 lg:gap-7.5">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </ul>
    </section>
  );
}
