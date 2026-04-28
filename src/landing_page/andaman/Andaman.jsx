import React from 'react';
import HeroSection from './HeroSection';
import ExploreDestinations from './ExploreDestinations';
import TourPackages from './TourPackages';
import ChooseSection from './ChooseSection';
import TestimonialSection from './TestimonialSection';
import FAQSection from './FAQSection';

const Andaman = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <ExploreDestinations />
      <TourPackages />
      <ChooseSection />
      <TestimonialSection />
      <FAQSection />
    </div>
  );
};

export default Andaman;
