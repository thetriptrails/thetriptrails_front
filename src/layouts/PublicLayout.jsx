import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom"; 
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import BookingModal from "../components/queryForm/Bookingmodal ";

const PublicLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [location.pathname]); 

  return (
    <>
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <Navbar />
      <React.Suspense fallback={<div className="min-h-[70vh] w-full bg-[#FCFBFA]"></div>}>
        <Outlet />
      </React.Suspense>
      <Footer />
    </>
  );
};

export default PublicLayout;