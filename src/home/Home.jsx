import HomeHero from "../home/HomeHero";
import MarqueeStrip from "../home/MarqueeStrip";
import TripPlanner from "../home/TripPlanner";
import HomeLatestDestinations from "./HomeLatestDestinations";
import WhyChooseUs from "../home/WhyChooseUs";
import HomePremiumPackages from "../home/HomePremiumPackages";
import HomeTestimonials from "../home/HomeTestimonials";
import HomeBlogPreview from "../home/HomeBlogPreview";
import HomeServices from "./HomeServices";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <HomeHero />
      <MarqueeStrip />
      <TripPlanner />
      <HomeLatestDestinations />
      <HomeServices/>
      <WhyChooseUs />
      <HomePremiumPackages />
      <HomeTestimonials />
      <HomeBlogPreview />
    </main>
  );
}

