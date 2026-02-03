import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuickCategoryNav } from "@/components/home/QuickCategoryNav";
import { TrendingSection } from "@/components/home/TrendingSection";
import { NewAdditionsSection } from "@/components/home/NewAdditionsSection";
import { HeroManifesto } from "@/components/home/HeroManifesto";

export default function Index() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Quick Category Navigation */}
      <QuickCategoryNav />

      {/* Trending Section */}
      <TrendingSection />

      {/* New Additions */}
      <NewAdditionsSection />

      {/* Hero Manifesto */}
      <HeroManifesto />

      <Footer />
    </div>
  );
}
