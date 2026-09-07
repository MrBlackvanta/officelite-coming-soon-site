"use client";

import { cn } from "@/lib";
import { type CSSProperties, useEffect, useRef, useState } from "react";

type CountingPriceProps = {
  dollars: number;
  cents: number;
  className?: string;
};

export function CountingPrice({
  dollars,
  cents,
  className,
}: CountingPriceProps) {
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
      <span className="sr-only">
        ${dollars}.{String(cents).padStart(2, "0")}
      </span>
      <span
        ref={numberRef}
        aria-hidden="true"
        className={cn("v-count", hasEntered && "v-count-run")}
        style={{ "--v-dollars": dollars, "--v-cents": cents } as CSSProperties}
      />
    </p>
  );
}
