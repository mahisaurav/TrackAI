import HeroSection from "../components/landing/HeroSection";
import FeatureSection from "../components/landing/FeatureSection";
import DashboardPreview from "../components/landing/DashboardPreview";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

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