import { Navbar } from "../components/LandingComponents/Navbar";
import { HeroSection } from "../components/LandingComponents/HeroSection";
import { FeatureSection } from "../components/LandingComponents/FeatureSection";
import { WorkflowSection } from "../components/LandingComponents/WorkflowSection";
import { PricingSection } from "../components/LandingComponents/PricingSection";
import { Testimonials } from "../components/LandingComponents/Testimonials";
import { Footer } from "../components/LandingComponents/Footer";

export function Landing() {
  console.log("Landing.jsx");
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />     
        <FeatureSection />
        {/* <WorkflowSection />
        <PricingSection /> */}
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}
