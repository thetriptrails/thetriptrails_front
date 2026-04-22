import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Why are South India tour packages a good option for travel?",
      answer: "South India tour packages cover multiple destinations like Kerala, Tamil Nadu, and Karnataka in one trip, making travel easy, organized, and time-saving."
    },
    {
      question: "Are your South India tour packages budget-friendly?",
      answer: "Yes, our South India tour packages are designed for every budget, with affordable pricing, flexible options, and no hidden charges."
    },
    {
      question: "Can I plan a short trip with South India tour packages?",
      answer: "Yes, South India tour packages are available for short trips as well as long vacations, depending on your travel time and preferences."
    },
    {
      question: "Do your South India tour packages include hotel and transport?",
      answer: "Yes, our South India tour packages include comfortable hotel stays, local transport, and complete travel arrangements for a smooth experience."
    },
    {
      question: "Which destinations are covered in South India tour packages?",
      answer: "South India tour packages usually include popular places like Kerala backwaters, Ooty, Coorg, Munnar, and famous temples in Tamil Nadu."
    },
    {
      question: "Are South India tour packages suitable for couples and honeymoon?",
      answer: "Yes, South India tour packages are perfect for couples, offering romantic destinations like Munnar, Alleppey, and Ooty with peaceful and scenic views."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 bg-white font-sans">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-[#D4AF37]">Questions</span>
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-gray-600">Below are some important FAQs.</p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-base md:text-lg font-bold text-gray-800 pr-4">
                  {index + 1}. {faq.question}
                </h3>
                <div className={`flex-shrink-0 p-1 rounded-full ${openIndex === index ? 'bg-[#D4AF37] text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support Call to Action */}
        <div className="mt-8 p-6 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl text-center">
          <p className="text-gray-700 text-sm">
            Still have questions? Our <strong>Dedicated Support Team</strong> is here to help 24/7.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;