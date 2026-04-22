import React from 'react';
import HeroSection from './HeroSection';
import ExploreDestinations from './ExploreDestinations';
import TourPackages from './TourPackages';
import ServicesSection from './ServicesSection';
import ChooseSection from './ChooseSection';
import TestimonialSection from './TestimonialSection';
import FAQSection from './FAQSection';

const Goa = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <ExploreDestinations />
      <TourPackages />
      {/* <ServicesSection /> */}
      <ChooseSection />
      <TestimonialSection />
      <FAQSection />
    </div>
  );
};

export default Goa;
