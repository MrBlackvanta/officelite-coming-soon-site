import { cn } from "@/lib";

type SignatureProps = {
  className?: string;
};

export function Signature({ className }: SignatureProps) {
  return (
    <p
      className={cn(
        "v-shell text-surface/70 absolute inset-x-0 bottom-0.5 text-center text-xs",
        className,
      )}
    >
      Coded by{" "}
      <a
        href="https://www.linkedin.com/in/abdelrhman-vanta/"
        target="_blank"
        rel="noopener noreferrer"
        className="v-focus-ring underline underline-offset-2"
      >
        Abdelrhman Abdelaal
      </a>
      .
    </p>
  );
}
