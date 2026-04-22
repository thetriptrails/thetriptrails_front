import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is included in North East India tour packages?",
            answer: "Our North East India tour packages by The Trip Trails Tour & Travels include comfortable hotel stays, daily meals (as per plan), comprehensive sightseeing, private transportation, and expert-guided tours for a hassle-free travel experience.",
            isH3: false
        },
        {
            question: "Are North East India tour packages customizable?",
            answer: "Yes, The Trip Trails Tour & Travels offers fully customizable packages. Travelers can modify destinations, trip duration, hotel categories, and activities based on their specific budget and preferences.",
            isH3: true
        },
        {
            question: "Are group discounts available on North East India tour packages?",
            answer: "Absolutely! The Trip Trails Tour & Travels offers special volume discounts for group bookings, making our packages an affordable choice for families, large groups of friends, and corporate retreats.",
            isH3: false
        },
        {
            question: "How much do North East India tour packages cost?",
            answer: "Our packages start at highly affordable prices. The final cost varies depending on the chosen destinations, duration of the stay, hotel luxury level, and the specific customization requirements of the traveler.",
            isH3: true
        },
        {
            question: "Which destinations are covered in North East India tour packages?",
            answer: "The Trip Trails Tour & Travels covers all iconic locations including Sikkim, Assam, Meghalaya, and Arunachal Pradesh. We ensure a complete travel experience across the most popular spots in the region.",
            isH3: true
        },
        {
            question: "Is it safe to travel with North East India tour packages?",
            answer: "Yes, safety is our priority. Our North East India tour packages ensure a secure journey with verified hotels, highly experienced local drivers, and 24/7 support to provide a safe and enjoyable environment.",
            isH3: true
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-10 bg-white font-sans">
            <div className="container mx-auto px-6 max-w-4xl">

                {/* Section Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                        Frequently Asked <span className="text-[#D4AF37]">Questions</span>
                    </h2>
                    <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
                    <p className="text-gray-600 text-lg">
                        Explore the most asked FAQs about our North East India tour packages.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border rounded-xl transition-all duration-300 ${openIndex === index ? 'border-[#D4AF37] shadow-md' : 'border-gray-100'
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                            >
                                <div className="flex items-center gap-4">
                                    <HelpCircle size={20} className={openIndex === index ? 'text-[#D4AF37]' : 'text-gray-400'} />
                                    {faq.isH3 ? (
                                        <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                                    ) : (
                                        <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                                    )}
                                </div>
                                {openIndex === index ? (
                                    <ChevronUp size={20} className="text-[#D4AF37]" />
                                ) : (
                                    <ChevronDown size={20} className="text-gray-400" />
                                )}
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Support CTA */}
                <div className="mt-8 text-center p-8 bg-gray-50 rounded-2xl">
                    <p className="text-gray-600 mb-4">Still have questions about our North East India tours?</p>
                    <Link
                        to="/contact"
                        className="text-[#D4AF37] font-bold hover:text-black transition-colors underline decoration-2 underline-offset-4 inline-block"
                    >
                        Contact Our Travel Experts 24/7
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default FAQSection;