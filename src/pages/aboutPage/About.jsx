
import HeroSection from "../../components/about/Herosection";
import StatsStrip from "../../components/about/Statsstrip";
import OurStory from "../../components/about/Ourstory";
import MissionVision from "../../components/about/Missionvision";
import WhyChooseUs from "../../components/about/Whychooseus";
import CTASection from "../../components/about/Ctasection";
import HomeTestimonials from '../../home/HomeTestimonials';

export default function About() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      < StatsStrip/>
      <OurStory />
      <MissionVision />
      <WhyChooseUs />
      <HomeTestimonials/>
      <CTASection />
    </main>
  );
}