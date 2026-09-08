"use client";

import { type Amount, formatPrice } from "@/data";
import { cn } from "@/lib";
import { type CSSProperties, useEffect, useRef, useState } from "react";

type CountingPriceProps = {
  price: Amount;
  className?: string;
};

export function CountingPrice({ price, className }: CountingPriceProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const number = numberRef.current;
    if (!number) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setHasEntered(true);
      },
      { threshold: 1 },
    );

    observer.observe(number);
    return () => observer.disconnect();
  }, []);

  return (
    <p className={className}>
      <span className="sr-only">{formatPrice(price)}</span>
      <span
        ref={numberRef}
        aria-hidden="true"
        className={cn("v-count", hasEntered && "v-count-run")}
        style={
          {
            "--v-dollars": price.dollars,
            "--v-cents": price.cents,
          } as CSSProperties
        }
      />
    </p>
  );
}
