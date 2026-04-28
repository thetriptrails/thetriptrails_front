import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./layouts/ScrollToTop";

import PublicLayout from "./layouts/PublicLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import { lazy, Suspense } from "react";

const Home = lazy(() => import("./home/Home"));
const Destination = lazy(() => import("./destination/Destination"));
const DestinationDetail = lazy(() => import("./destination/DestinationDetails"));
const About = lazy(() => import("./pages/aboutPage/About"));
const Services = lazy(() => import("./pages/servicesPage/Services"));
const Packages = lazy(() => import("./pages/packagesPage/Packages"));
const Contact = lazy(() => import("./pages/contactPage/Contact"));
const Blog = lazy(() => import("./pages/blogPage/Blog"));
const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));
const Forgot = lazy(() => import("./auth/Forgot"));
const Reset = lazy(() => import("./auth/Reset"));
const DashboardLayout = lazy(() => import("./admin/DashboardLayout"));
const DashboardContent = lazy(() => import("./admin/DashboardContent"));
const Profile = lazy(() => import("./admin/profile/Profile"));
const ServiceDetails = lazy(() => import("./pages/servicesPage/ServiceDetails"));
const ServicesPage = lazy(() => import("./admin/services/ServicesPage"));
const PackagesPage = lazy(() => import("./admin/packages/PackagesPage"));
const PostDetail = lazy(() => import("./pages/blogPage/PostDetail"));
const PostPage = lazy(() => import("./admin/post/PostPage"));
const DestinationPage = lazy(() => import("./admin/destination/DestinationPage"));
const Enquiry = lazy(() => import("./components/queryForm/Enquiry"));
const TestimonialsPage = lazy(() => import("./admin/testimonial/TestimonialsPage"));
const Uttarakhand = lazy(() => import("./landing_page/uttarakhand/Uttarakhand"));
const SouthIndia = lazy(() => import("./landing_page/southIndia/SouthIndia"));
const NorthEast = lazy(() => import("./landing_page/northEast/NorthEast"));
const Andaman = lazy(() => import("./landing_page/andaman/Andaman"));
const Goa = lazy(() => import("./landing_page/goa/Goa"));
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./PrivacyPolicy/TermsAndConditions"));
const CancellationPolicy = lazy(() => import("./PrivacyPolicy/CancellationPolicy"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="h-screen w-full bg-[#FCFBFA]"></div>}>
        <Routes>
          {/* 🌐 PUBLIC */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destination />} />
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
            <Route
              path="/north-east-india-tour-packages"
              element={<NorthEast />}
            />
            <Route path="/andaman-tour-packages" element={<Andaman />} />
            <Route path="/goa-tour-packages" element={<Goa />} />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
