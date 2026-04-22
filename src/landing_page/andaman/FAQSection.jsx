import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            q: "How many days are enough for Andaman Tour Packages?",
            a: "A 4 to 6 days trip is ideal for Andaman Tour Packages, covering Port Blair, Havelock Island, and Neil Island with a balanced itinerary."
        },
        {
            q: "Are Andaman Tour Packages suitable for honeymoon?",
            a: "Yes, Andaman Tour Packages are perfect for honeymoon couples with romantic beaches, luxury resorts, candlelight dinners, and private island experiences."
        },
        {
            q: "What is included in Andaman Tour Packages?",
            a: "Andaman Tour Packages usually include hotel stay, meals, airport transfers, sightseeing, ferry tickets, and guided tours for a hassle-free travel experience."
        },
        {
            q: "Are water activities included in Andaman Tour Packages?",
            a: "Some Andaman Tour Packages include water activities like snorkeling or scuba diving, while others offer them as optional add-ons based on traveler preferences."
        },
        {
            q: "Is Andaman safe for family trips?",
            a: "Yes, Andaman Tour Packages are safe and suitable for families, offering clean beaches, peaceful environments, and well-managed tourist facilities for all age groups."
        },
        {
            q: "How can I customize Andaman Tour Packages?",
            a: "Andaman Tour Packages can be customized by selecting preferred hotels, travel dates, activities, and itinerary based on budget and travel needs."
        },
        {
            q: "Which are the must-visit places in Andaman Tour Packages?",
            a: "Popular places in Andaman Tour Packages include Port Blair, Havelock Island, Neil Island, and Radhanagar Beach known for scenic beauty and water activities."
        },
        {
            q: "Are flights included in Andaman Tour Packages?",
            a: "Some Andaman Tour Packages include flights, while others provide land-only packages, allowing travelers to choose flexible travel options based on budget."
        }
    ];

    const toggleFaq = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };

    return (
        <section className="py-10 bg-white font-sans">
            <div className="container mx-auto px-6 max-w-4xl">

                {/* Section Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                        Explore Important <span className="text-[#D4AF37]">FAQs</span>
                    </h2>
                    <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
                    <p className="text-gray-600 text-lg">
                        Common questions about our Andaman Tour Packages
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                            >
                                <h3 className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-[#D4AF37]' : 'text-gray-900'}`}>
                                    {faq.q}
                                </h3>
                                <span className={`ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all ${openIndex === index ? 'bg-[#D4AF37] text-white border-[#D4AF37]' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                    {openIndex === index ? '−' : '+'}
                                </span>
                            </button>
                            
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-6 pt-0 border-t border-gray-50">
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Support CTA */}
                <div className="mt-8 text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-gray-600 mb-4">Still have questions about our Andaman tours?</p>
                    <Link
                        to="/contact"
                        className="inline-block px-8 py-3 bg-gray-900 hover:bg-[#D4AF37] text-white text-sm font-bold uppercase tracking-widest rounded-lg transition-colors"
                    >
                        Contact Support
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default FAQSection;
