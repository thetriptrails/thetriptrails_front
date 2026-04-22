import HeroSection from '../components/hero/HeroSection'
import PackagesHome from "../components/package/PackagesHome";
import WhyChooseUs from "../components/whyChooseUs/WhyChooseUs";
import Gallery from "../components/gallery/Gallery";
import ContactSection from "../components/contact/ContactSection";
import Testimonials from "../components/testonomials/Testimonials";
import DestinationList from "./DestinationList";


const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <DestinationList/>
      <PackagesHome />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <ContactSection />
    </div>
  );
};

export default HomePage;