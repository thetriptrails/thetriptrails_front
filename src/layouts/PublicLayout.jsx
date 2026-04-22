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
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;