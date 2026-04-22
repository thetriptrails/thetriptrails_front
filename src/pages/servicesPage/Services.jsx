import ServicesHero from "./ServicesHero";
import ServicesGrid from "./ServicesGrid";
import HowItWorks from "./HowItWorks";
import FeaturesStrip from "./FeaturesStrip";

export default function Services() {
  return (
    <main className="w-full overflow-x-hidden">
      <ServicesHero />
      <ServicesGrid />
      <HowItWorks />
      <FeaturesStrip />
    </main>
  );
}