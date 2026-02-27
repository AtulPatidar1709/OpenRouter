import FeatureCards from "@/components/Home/FeatureCards";
import FeaturedModels from "@/components/Home/FeaturedModels";
import Hero from "@/components/Home/Hero";
import Stats from "@/components/Home/Stats";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-50 via-white to-pink-50 text-foreground">
      <Hero />
      <Stats />
      <FeatureCards />
      <FeaturedModels />
    </div>
  );
}

export default Home;
