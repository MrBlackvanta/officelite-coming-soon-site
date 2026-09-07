import { cn } from "@/lib";

type HeaderRingsProps = {
  className?: string;
};

export function HeaderRings({ className }: HeaderRingsProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "v-shell pointer-events-none absolute inset-x-0 top-0",
        className,
      )}
    >
      <div className="absolute -top-42.5 left-1/2 -z-10 size-114.5 -translate-x-1/2 bg-[url(/bg-pattern-header.svg)] bg-cover md:-top-41 md:-right-73.25 md:left-auto md:size-166.5 md:translate-x-0 lg:-top-104.75 lg:-right-118.75 lg:size-283.5" />
    </div>
  );
}
