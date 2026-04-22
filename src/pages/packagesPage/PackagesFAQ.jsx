import { useState } from "react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const faqs = [
  {
    q: "Can I customize the itinerary for my group?",
    a: "Absolutely. Being an India-wide agency, we offer 'Customized Holiday' (FIT) services. We can modify hotel categories, add specific sightseeing, or change the pace of the trip to suit your preferences.",
  },
  {
    q: "What is the cancellation and refund policy?",
    a: "As per 2026 industry standards, we offer a 48-hour 'look-in' window for full refunds. Post that, 25% is charged if cancelled 30 days before; 50% between 15-30 days; and no refund within 7 days of travel.",
  },
  {
    q: "Are the package prices inclusive of GST?",
    a: "Our displayed starting prices usually exclude the mandatory 5% GST for domestic tours. The final invoice will show a clear breakdown of the base fare and government taxes.",
  },
  {
    q: "Do you offer discounts for large groups or families?",
    a: "Yes, we provide 'Tiered Pricing'. Groups of 10 or more adults typically receive a 10-15% discount on the land package. Corporate or 'Incentive' groups can request bulk quotes.",
  },
  {
    q: "Are flights included in the displayed package price?",
    a: "Packages are 'Land-Only' by default to give you flexibility with your preferred airline. However, we can add flights at current market rates and provide the updated total cost.",
  },
  {
    q: "What kind of travel insurance is provided?",
    a: "All packages include basic domestic travel insurance covering accidental medical expenses and baggage loss. We recommend 'Premium' add-ons for trip curtailment or high-altitude adventure sports.",
  },
];

export default function PackagesFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="w-full bg-[#FAFAF7] px-4 sm:px-8 md:px-16 lg:px-24 py-0">
      <div className="max-w-4xl mx-auto py-12"> {/* Internal padding for content only */}
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            Planning Your <span style={{ color: GOLD }}>Journey</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-sm"
              style={{ border: "0.5px solid #E5E0D5" }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center justify-between px-6 py-5 gap-4">
                <p className="text-sm md:text-base font-medium" style={{ color: NAVY }}>
                  {faq.q}
                </p>
                <span
                  className="text-xl flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: GOLD,
                    transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </div>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div
                  className="px-6 pb-5 text-sm text-gray-500 leading-relaxed"
                  style={{ borderTop: "0.5px solid #F5F1E9" }}
                >
                  <p className="pt-4">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}