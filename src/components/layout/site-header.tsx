import Link from "next/link";
import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header className="v-shell flex justify-center pt-11.5 md:justify-start md:pt-18 lg:pt-20.25">
      <Link href="/" className="v-focus-ring outline-brand rounded-full">
        <Logo className="text-night" />
      </Link>
    </header>
  );
}
