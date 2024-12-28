import FeaturedSection from "@/components/FeaturedSection/FeaturedSection";
import Contact from "./Contact";
import Category from "@/components/Category/Category";
import FlashSaleBanner from "@/components/Banner/FlashSaleBanner";
import HeroSection from "@/components/HeroSection/HeroSection";
import Newsletter from "@/components/Newsletter/Newsletter";

const Home = () => {
  return (
    <div className="space-y-20">
      <HeroSection />
      <FlashSaleBanner />
      <FeaturedSection />
      <Category />
      <Newsletter />
      <Contact />
    </div>
  );
};

export default Home;
