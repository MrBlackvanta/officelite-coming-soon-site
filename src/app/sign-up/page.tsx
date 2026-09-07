import { siteName } from "@/data";
import { pageMetadata } from "@/lib/metadata";
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
  return <main />;
}
