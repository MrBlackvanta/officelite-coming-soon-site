import { ErrorIcon } from "@/components/icons";
import { cn } from "@/lib";
import type { ChangeEvent } from "react";

type FormFieldProps = {
  name: string;
  label: string;
  type: string;
  autoComplete: string;
  value: string;
  error?: string;
  attempt: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function FormField({
  name,
  label,
  type,
  autoComplete,
  value,
  error,
  attempt,
  onChange,
}: FormFieldProps) {
  const errorId = `${name}-error`;

  return (
    <div className="relative min-h-17.25">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        autoComplete={autoComplete}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "v-focus-ring outline-brand text-body placeholder:text-muted w-full border-b ps-4 pb-4",
          error
            ? "border-danger text-danger pe-10"
            : "border-hairline text-ink",
        )}
      />
      {error && (
        <>
          <ErrorIcon className="text-danger pointer-events-none absolute inset-e-5 top-1" />
          <p
            key={attempt}
            id={errorId}
            role="alert"
            className="text-danger mt-1 text-xs"
          >
            {error}
          </p>
        </>
      )}
    </div>
  );
}
