import { LandingFooter } from "@/components/home/landing-footer";
import { LandingHeader } from "@/components/home/landing-header";
import { SocialsSection } from "@/components/home/socials-section";

export default function SocialsPage() {
  return (
    <main className="onboarding-page relative min-h-screen w-full overflow-hidden bg-[#040404] text-white">
      <LandingHeader activeHref="/socials" />
      <div className="pt-18">
        <SocialsSection />
      </div>
      <LandingFooter />
    </main>
  );
}
