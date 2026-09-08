import { Signature, SiteHeader } from "@/components/layout";
import { HeaderRings } from "@/components/ui";
import { siteName } from "@/data";
import { pageMetadata } from "@/lib/metadata";
import { SidePanel, SignUpForm, SignUpIntro } from "@/views/sign-up";
import type { Metadata } from "next";

const title = "Get early access";
const description =
  "Join the officelite early access list. Pick a pack, claim the in-app perks reserved for early subscribers, and be first in when the platform launches.";

export const metadata: Metadata = pageMetadata({
  title,
  shareTitle: `${title} | ${siteName}`,
  description,
  path: "/sign-up",
});

export default function SignUpPage() {
  return (
    <div className="relative min-h-dvh overflow-x-clip pb-21.75 md:pb-30.75 xl:pb-25">
      <SidePanel />
      <HeaderRings className="md:hidden" />
      <SiteHeader />
      <main className="v-shell xl:flex xl:items-start xl:justify-between">
        <SignUpIntro />
        <SignUpForm />
      </main>
      <footer>
        <Signature className="xl:text-muted" />
      </footer>
    </div>
  );
}
