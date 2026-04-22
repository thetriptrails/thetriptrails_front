import React from 'react';
import HeroSection from './HeroSection';
import ExploreDestinations from './ExploreDestinations';
import TourPackages from './TourPackages';
import WhyChooseUs from './WhyChooseUs';
import ServicesSection from './ServicesSection';
import TravelExpertSection from './TravelExpertSection';

const Uttarakhand = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <ExploreDestinations/>
      <TourPackages/>
      <WhyChooseUs/>
      <ServicesSection/>
      <TravelExpertSection/>
    </div>
  );
};

export default Uttarakhand;