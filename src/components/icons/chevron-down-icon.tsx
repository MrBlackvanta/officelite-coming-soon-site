type ChevronDownIconProps = {
  className?: string;
};

export function ChevronDownIcon({ className }: ChevronDownIconProps) {
  return (
    <svg
      viewBox="0 0 13 8"
      width="13"
      height="8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={className}
    >
      <path d="M1 1l5.5 5.5L12 1" />
    </svg>
  );
}
