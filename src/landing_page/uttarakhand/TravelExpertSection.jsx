import React, { useState, useEffect } from 'react';
import { getAllTestimonials } from "../../services/testimonial.service";

const TravelExpertSection = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getAllTestimonials({ limit: 3 });
        let data = res?.testimonials || res?.data || res || [];
        if (!Array.isArray(data)) data = [];
        setReviews(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchReviews();
  }, []);

  const faqs = [
    {
      q: "What destinations do you cover in Uttarakhand?",
      a: "We cover all major destinations like Nainital, Mussoorie, Rishikesh, Kedarnath, and Badrinath. The Trip Trails ensures you get the best routes and travel experience."
    },
    {
      q: "Are your tour packages customizable?",
      a: "Yes, all packages can be customized based on your needs. The Trip Trails allows you to plan your trip your way — dates, budget, and destinations."
    },
    {
      q: "Do you provide complete travel arrangements?",
      a: "Yes, we handle everything from hotel booking to transport and sightseeing. With The Trip Trails, you get a complete hassle-free travel experience."
    },
    {
      q: "Is booking with you safe and reliable?",
      a: "Absolutely, we focus on transparency and customer satisfaction. The Trip Trails is trusted by many travelers for safe and smooth journeys."
    },
    {
      q: "Do you offer group and family packages?",
      a: "Yes, we offer special packages for families, couples, and groups. The Trip Trails designs trips that suit every type of traveler."
    },
    {
      q: "What payment options are available?",
      a: "We provide flexible payment options for easy booking. The Trip Trails makes the process simple and convenient for everyone."
    },
    {
      q: "Do you provide support during the trip?",
      a: "Yes, we offer 24/7 support during your journey. The Trip Trails is always there to help you whenever needed."
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-white font-sans">
      
      {/* Rating & Reviews Section */}
      <section className="py-10 bg-[#fcfcfc]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mt-3">
              What Our <span className="text-[#D4AF37]">Happy Travelers</span> Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={review._id || index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="flex text-[#D4AF37] mb-4">
                  {[...Array(Number(review.stars) || 5)].map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">"{review.quote || "Amazing trip!"}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold">
                    {(review.name || "T")[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 leading-none">{review.name || "Happy Traveler"}</h4>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">{review.location}</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9125 16 16.0171 16H19.0171C20.1217 16 21.0171 15.1046 21.0171 14V9C21.0171 7.89543 20.1217 7 19.0171 7H15.0171C13.9125 7 13.0171 7.89543 13.0171 9V15C13.0171 16.0544 12.6151 17.0652 11.8961 17.8344L14.017 21ZM5.01711 21L5.01711 18C5.01711 16.8954 5.91254 16 7.01711 16H10.0171C11.1217 16 12.0171 15.1046 12.0171 14V9C12.0171 7.89543 11.1217 7 10.0171 7H6.01711C4.91254 7 4.01711 7.89543 4.01711 9V15C4.01711 16.0544 3.61507 17.0652 2.89607 17.8344L5.01711 21Z" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mt-3 mb-4">
              Frequently Asked <span className="text-[#D4AF37]">Questions</span>
            </h2>
            <p className="text-gray-500 text-sm">Find answers to the most common questions about our travel services.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-all"
                >
                  <span className={`text-sm md:text-base font-bold transition-colors ${activeFaq === index ? 'text-[#D4AF37]' : 'text-gray-900'}`}>
                    {index + 1}. {faq.q}
                  </span>
                  <span className={`text-xl transition-transform duration-300 ${activeFaq === index ? 'rotate-180 text-[#D4AF37]' : 'text-gray-400'}`}>
                    {activeFaq === index ? '−' : '+'}
                  </span>
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 pt-0 text-sm text-gray-500 leading-relaxed border-t border-gray-50 bg-gray-50/30">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TravelExpertSection;