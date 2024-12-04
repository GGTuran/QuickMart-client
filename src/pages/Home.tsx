import FeaturedSection from "@/components/FeaturedSection/FeaturedSection";
import Contact from "./Contact";
import Category from "@/components/Category/Category";
import FlashSaleBanner from "@/components/Banner/FlashSaleBanner";

const Home = () => {
  return (
    <div className="space-y-20">
      <FlashSaleBanner />
      <FeaturedSection />
      <Category />
      <Contact />
    </div>
  );
};

export default Home;
