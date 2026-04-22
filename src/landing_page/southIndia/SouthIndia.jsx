import React from 'react';
import HeroSection from './HeroSection';
import ExploreDestinations from './ExploreDestinations';
import TourPackages from './TourPackages';
// import ServicesSection from './ServicesSection';
import ChooseSection from './ChooseSection';
import FAQSection from './FAQSection';

const SouthIndia = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <ExploreDestinations />
      <TourPackages />
      {/* <ServicesSection/> */}
      <ChooseSection/>
      <FAQSection/>
    </div>
  );
};

export default SouthIndia;
