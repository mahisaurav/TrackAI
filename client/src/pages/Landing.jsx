import HeroSection from "../components/landing_temp/HeroSection";
import FeatureSection from "../components/landing_temp/FeatureSection";
import DashboardPreview from "../components/landing_temp/DashboardPreview";
import CTASection from "../components/landing_temp/CTASection";
import Footer from "../components/landing_temp/Footer";

function Landing() {

  return (
    <div className="bg-black text-white">

      <HeroSection />
      <FeatureSection />
      <DashboardPreview />
        <CTASection />
        <Footer />

    </div>
  );
}

export default Landing;