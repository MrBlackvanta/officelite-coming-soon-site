"use client";

import { cn, secondsUntil, splitRemaining, type Remaining } from "@/lib";
import { useMemo, useSyncExternalStore } from "react";

type CountdownProps = {
  target: number;
  renderedAt: number;
  className?: string;
};

const units: { key: keyof Remaining; label: string }[] = [
  { key: "days", label: "days" },
  { key: "hours", label: "hours" },
  { key: "minutes", label: "min" },
  { key: "seconds", label: "sec" },
];

function createTicker(target: number) {
  const listeners = new Set<() => void>();
  let secondsLeft = secondsUntil(target, Date.now());
  let timer: ReturnType<typeof setInterval> | undefined;

  const tick = () => {
    const next = secondsUntil(target, Date.now());
    if (next === secondsLeft) return;
    secondsLeft = next;
    for (const listener of listeners) listener();
  };

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      timer ??= setInterval(tick, 200);

      return () => {
        listeners.delete(listener);
        if (listeners.size > 0) return;
        clearInterval(timer);
        timer = undefined;
      };
    },
    getSnapshot: () => secondsLeft,
  };
}

export function Countdown({ target, renderedAt, className }: CountdownProps) {
  const ticker = useMemo(() => createTicker(target), [target]);
  const secondsLeft = useSyncExternalStore(
    ticker.subscribe,
    ticker.getSnapshot,
    () => secondsUntil(target, renderedAt),
  );
  const remaining = splitRemaining(secondsLeft);

  return (
    <ul
      role="list"
      className={cn(
        "flex justify-center gap-3.25 md:gap-4 lg:justify-start",
        className,
      )}
    >
      {units.map(({ key, label }) => (
        <li
          key={key}
          className="bg-ink rounded-card flex h-23 max-w-18 flex-1 flex-col items-center pt-3 md:h-32 md:max-w-none md:min-w-25 md:flex-none md:pt-6"
        >
          <span className="text-count-sm text-surface md:text-count font-bold">
            {String(remaining[key])
              .padStart(2, "0")
              .split("")
              .map((digit, position) => (
                <span
                  key={position}
                  className="inline-block w-[1ch] text-center"
                >
                  {digit}
                </span>
              ))}
          </span>
          <span className="text-count-label text-surface/55 md:text-body -mt-1.5 font-bold md:mt-2.5">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}
