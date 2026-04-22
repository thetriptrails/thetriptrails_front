import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            q: "What is included in Goa Tour Packages?",
            a: "Goa Tour Packages usually include hotel stay, sightseeing, local transfers, and optional activities like water sports, depending on the package type."
        },
        {
            q: "What is the average cost of Goa Tour Packages?",
            a: "Goa Tour Packages can start from budget-friendly prices and go higher based on hotel category, trip duration, and included experiences like activities and meals."
        },
        {
            q: "How many days are enough to explore Goa?",
            a: "A 3 to 5 days Goa Tour Package is ideal to explore major beaches, enjoy nightlife, and cover popular sightseeing spots comfortably."
        },
        {
            q: "Which is better for tourists – North Goa or South Goa?",
            a: "North Goa is best for nightlife, parties, and water sports, while South Goa is ideal for peaceful beaches, relaxation, and luxury stays."
        },
        {
            q: "Can Goa Tour Packages be customized?",
            a: "Yes, Goa Tour Packages can be customized based on travel preferences, budget, hotel choice, and activities for a personalized travel experience."
        },
        {
            q: "What is the best time to book Goa Tour Packages?",
            a: "The best time to book Goa Tour Packages is from October to March, when the weather is pleasant and suitable for beach activities and sightseeing."
        },
        {
            q: "Are flights included in Goa Tour Packages?",
            a: "Some Goa Tour Packages include flights, while others cover only land arrangements like hotel, transfers, and sightseeing. It depends on the package selected."
        },
        {
            q: "Is Goa safe for family trips?",
            a: "Yes, Goa is a safe and popular destination for families, offering clean beaches, good hotels, and plenty of sightseeing and activity options."
        },
        {
            q: "What activities are included in Goa Tour Packages?",
            a: "Most Goa Tour Packages include beach visits, sightseeing tours, and optional activities like parasailing, jet skiing, dolphin trips, and nightlife experiences."
        },
        {
            q: "Why book Goa Tour Packages with a travel agency?",
            a: "Booking through a trusted agency like The Trip Trails Tour & Travels ensures better deals, proper planning, local support, and a hassle-free travel experience."
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
                        Common questions about our Goa Tour Packages
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
                                    Q{index + 1}. {faq.q}
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
                    <p className="text-gray-600 mb-4">Still have questions about our Goa tours?</p>
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
