import { cn } from "@/lib";
import Link from "next/link";

export type CtaVariant = "solid" | "ghost" | "plain";

const variants: Record<CtaVariant, string> = {
  solid: "bg-brand text-surface outline-brand hover:bg-brand-ink",
  ghost:
    "bg-ghost text-brand-ink outline-brand hover:bg-ghost-hover hover:text-brand-deep",
  plain: "bg-surface text-brand-ink outline-surface hover:text-brand-deep",
};

export function ctaClass(variant: CtaVariant, className?: string) {
  return cn(
    "v-focus-ring inline-flex h-14 w-42.75 items-center justify-center rounded-full text-body font-bold motion-safe:transition-colors",
    variants[variant],
    className,
  );
}

type CtaLinkProps = {
  href: string;
  variant: CtaVariant;
  className?: string;
  children: React.ReactNode;
};

export function CtaLink({ href, variant, className, children }: CtaLinkProps) {
  return (
    <Link href={href} className={ctaClass(variant, className)}>
      {children}
    </Link>
  );
}
