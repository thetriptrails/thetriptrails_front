import HomeHero from "./HomeHero";
import MarqueeStrip from "./HomeMarqueeStrip";
import TripPlanner from "./TripPlanner";
import FeaturedDestinations from "./FeaturedDestinations";
import WhyChooseUs from "./WhyChooseUs";
import HomePremiumPackages from "./HomePremiumPackages";
import HomeTestimonials from "./HomeTestimonials";
import HomeBlogPreview from "./HomeBlogPreview";
import HomeCTA from "./HomeCTA";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <HomeHero />
      <MarqueeStrip />
      <TripPlanner />
      <FeaturedDestinations />
      <WhyChooseUs />
      <HomePremiumPackages />
      <HomeTestimonials />
      <HomeBlogPreview />
      <HomeCTA />
    </main>
  );
}