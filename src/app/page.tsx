import HomeCTA from "@/components/home/home-cta";
import HomeFeatures from "@/components/home/home-features";
import HomeFooter from "@/components/home/home-footer";
import HomeHero from "@/components/home/home-hero";
import HomeHowItWorks from "@/components/home/home-how-it-works";
import HomeNavbar from "@/components/home/home-navbar";
import HomeTemplates from "@/components/home/home-templates";
import HomeWorkflow from "@/components/home/home-workflow";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <HomeNavbar />
      <HomeHero />
      <HomeWorkflow />
      <HomeFeatures />
      <HomeHowItWorks />
      <HomeTemplates />
      <HomeCTA />
      <HomeFooter />
    </main>
  );
}