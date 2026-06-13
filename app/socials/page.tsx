import { LandingFooter } from "@/components/home/landing-footer";
import { LandingHeader } from "@/components/home/landing-header";
import { SocialsSection } from "@/components/home/socials-section";

export default function SocialsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <LandingHeader activeHref="/socials" />
      <div className="pt-4">
        <SocialsSection />
      </div>
      <LandingFooter />
    </main>
  );
}
