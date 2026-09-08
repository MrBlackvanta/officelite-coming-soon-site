export function SidePanel() {
  return (
    <div
      aria-hidden="true"
      className="bg-night pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-80 overflow-clip md:h-94.25 xl:top-0 xl:left-1/2 xl:ml-75 xl:h-auto"
    >
      <div className="absolute top-48.25 left-1/2 size-300.5 -translate-x-1/2 -translate-y-1/2 bg-[url(/bg-pattern-side.svg)] bg-cover md:top-47.5 md:size-363.5 xl:top-59.25 xl:left-63.75 xl:size-509" />
    </div>
  );
}
