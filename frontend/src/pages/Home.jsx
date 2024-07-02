import { Navbar } from "../components/HomeComponents/Navbar";
import { HeroSection } from "../components/HomeComponents/HeroSection";
import { FeatureSection } from "../components/HomeComponents/FeatureSection";
import { WorkflowSection } from "../components/HomeComponents/WorkflowSection";
import { PricingSection } from "../components/HomeComponents/PricingSection";
import { Testimonials } from "../components/HomeComponents/Testimonials";
import { Footer } from "../components/HomeComponents/Footer";

export function Home() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />     
        <FeatureSection />
        <WorkflowSection />
        <PricingSection />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}
