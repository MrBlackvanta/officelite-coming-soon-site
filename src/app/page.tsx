import { SiteHeader } from "@/components/layout";
import { HeaderRings } from "@/components/ui";
import { Hero } from "@/views/home";

export default function HomePage() {
  return (
    <div className="relative overflow-x-clip">
      <HeaderRings />
      <SiteHeader />
      <main>
        <Hero />
      </main>
    </div>
  );
}
