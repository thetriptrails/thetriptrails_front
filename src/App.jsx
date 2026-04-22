import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./home/Home";
import Destination from "./destination/Destination";
import DestinationDetail from "./destination/DestinationDetails";
import About from "./pages/aboutPage/About";
import Services from "./pages/servicesPage/Services";
import Packages from "./pages/packagesPage/Packages";
import Contact from "./pages/contactPage/Contact";
import Blog from "./pages/blogPage/Blog";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";
import DashboardLayout from "./admin/DashboardLayout";
import DashboardContent from "./admin/DashboardContent";
import Profile from "./admin/profile/Profile";
import ServiceDetails from "./pages/servicesPage/ServiceDetails";
import ServicesPage from "./admin/services/ServicesPage";
import PackagesPage from "./admin/packages/PackagesPage";
import PostDetail from "./pages/blogPage/PostDetail";
import PostPage from "./admin/post/PostPage";
import DestinationPage from "./admin/destination/DestinationPage";
import Enquiry from "./components/queryForm/Enquiry";
import TestimonialsPage from "./admin/testimonial/TestimonialsPage";
import Uttarakhand from "./landing_page/uttarakhand/Uttarakhand";
import SouthIndia from "./landing_page/southIndia/SouthIndia";
import NorthEast from "./landing_page/northEast/NorthEast";
import Andaman from "./landing_page/andaman/Andaman";
import Goa from "./landing_page/goa/Goa";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./PrivacyPolicy/TermsAndConditions";
import CancellationPolicy from "./PrivacyPolicy/CancellationPolicy";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destination/>} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />

          {/* Main Booking/Enquiry Page */}
          <Route path="/booking" element={<Enquiry />} />
          <Route path="/booking/:id" element={<ServiceDetails />} />

          <Route path="/packages" element={<Packages />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<PostDetail />} />

          {/* Optional: Redirect old /enquiry links to /booking so users don't see errors */}
          <Route path="/enquiry" element={<Navigate to="/booking" replace />} />

          {/* Landing pages Routes*/}
          <Route path="/uttarakhand-tour-packages" element={<Uttarakhand />} />
          <Route path="/south-india-tour-packages" element={<SouthIndia />} />
          <Route path="/north-east-india-tour-packages" element={<NorthEast />} />
          <Route path="/andaman-tour-packages" element={<Andaman />} />
          <Route path="/goa-tour-packages" element={<Goa />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
        </Route>

        {/* 🔐 AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset" element={<Reset />} />

        {/* 🛡 PROTECTED ADMIN */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<DashboardContent />} />
            <Route path="profile" element={<Profile />} />
            <Route path="services">
              <Route index element={<ServicesPage />} />
              <Route path=":id" element={<ServiceDetails />} />
            </Route>
            <Route path="packages">
              <Route index element={<PackagesPage />} />
            </Route>
            <Route path="posts">
              <Route index element={<PostPage />} />
            </Route>
            <Route path="destinations">
              <Route index element={<DestinationPage />} />
            </Route>
            <Route path="testimonials">
              <Route index element={<TestimonialsPage />} />
            </Route>
          </Route>
        </Route>

        {/* 404 Catch-all: Redirects to home if route doesn't exist */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;