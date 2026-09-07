import type { Price } from "@/data";

import { CountingPrice } from "./counting-price";

type PlanPriceProps = {
  price: Price;
  className?: string;
};

export function PlanPrice({ price, className }: PlanPriceProps) {
  if (typeof price === "string") {
    return <p className={className}>{price}</p>;
  }

  return <CountingPrice {...price} className={className} />;
}
