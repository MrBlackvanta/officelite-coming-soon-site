type ErrorIconProps = {
  className?: string;
};

export function ErrorIcon({ className }: ErrorIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path
        d="M12.475 6.61l1.414 1.415-2.475 2.475 2.475 2.475-1.414 1.414L10 11.914l-2.475 2.475-1.414-1.414L8.585 10.5 6.11 8.025l1.414-1.414L10 9.085l2.475-2.474z"
        fill="#fff"
      />
    </svg>
  );
}
