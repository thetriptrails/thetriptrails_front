import React from 'react';
import HeroSection from './HeroSection';
import ExploreDestinations from './ExploreDestinations';
import TourPackages from './TourPackages';
import ChooseSection from './ChooseSection';
import FAQSection from './FAQSection';

const SouthIndia = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <ExploreDestinations />
      <TourPackages />
      <ChooseSection/>
      <FAQSection/>
    </div>
  );
};

export default SouthIndia;
