"use client";

import { cn, splitRemaining, type Remaining } from "@/lib";

import { useLaunch } from "./use-launch";

type CountdownTone = "dark" | "light";

type CountdownProps = {
  renderedAt: number;
  tone: CountdownTone;
  className?: string;
};

const units: { key: keyof Remaining; label: string }[] = [
  { key: "days", label: "days" },
  { key: "hours", label: "hours" },
  { key: "minutes", label: "min" },
  { key: "seconds", label: "sec" },
];

const tones: Record<
  CountdownTone,
  { tile: string; value: string; label: string }
> = {
  dark: {
    tile: "bg-ink",
    value: "text-surface",
    label: "text-surface/55",
  },
  light: {
    tile: "bg-tile",
    value: "text-brand",
    label: "text-ink/75",
  },
};

export function Countdown({ renderedAt, tone, className }: CountdownProps) {
  const { secondsLeft } = useLaunch(renderedAt);
  const remaining = splitRemaining(secondsLeft);
  const colours = tones[tone];

  return (
    <ul
      role="list"
      className={cn("flex justify-center gap-3.25 md:gap-4", className)}
    >
      {units.map(({ key, label }) => (
        <li
          key={key}
          className={cn(
            "md:rounded-card flex h-23 max-w-18 flex-1 flex-col items-center rounded-sm pt-3 md:h-32 md:max-w-none md:min-w-25 md:flex-none md:pt-6",
            colours.tile,
          )}
        >
          <span
            className={cn(
              "text-count-sm md:text-count font-bold",
              colours.value,
            )}
          >
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
          <span
            className={cn(
              "text-count-label md:text-body -mt-1.5 font-bold md:mt-2.5",
              colours.label,
            )}
          >
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}
