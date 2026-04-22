import React from 'react';
import HeroSection from './HeroSection';
import ExploreDestinations from './ExploreDestinations';
import TourPackages from './TourPackages';
import ServicesSection from './ServicesSection';
import WhyChooseUs from './WhyChooseUs';
import FAQSection from './FAQSection';

const NorthEast = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <ExploreDestinations />
      <TourPackages />
      {/* <ServicesSection/> */}
      <WhyChooseUs/>
      <FAQSection/>
    </div>
  );
};

export default NorthEast;