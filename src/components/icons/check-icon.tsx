type CheckIconProps = {
  className?: string;
};

export function CheckIcon({ className }: CheckIconProps) {
  return (
    <svg
      viewBox="0 0 15 12"
      width="15"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={className}
    >
      <path d="M1 7.504L3.994 10.5 13.494 1" />
    </svg>
  );
}
