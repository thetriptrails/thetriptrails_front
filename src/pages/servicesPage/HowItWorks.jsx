const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const steps = [
  {
    number: "01",
    title: "Choose Service",
    description: "Browse our services and pick what excites you most.",
    highlighted: false,
  },
  {
    number: "02",
    title: "Send Enquiry",
    description: "Fill our quick form or call us directly anytime.",
    highlighted: false,
  },
  {
    number: "03",
    title: "Get Custom Plan",
    description: "Our team crafts a tailored itinerary just for you.",
    highlighted: false,
  },
  {
    number: "04",
    title: "Travel & Enjoy",
    description: "We handle everything — you just enjoy the journey!",
    highlighted: true,
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-white pt-2 pb-10 md:pb-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Reduced margin for mobile/laptop */}
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            How It <span style={{ color: GOLD }}>Works</span>
          </h2>
        </div>

        {/* Steps Grid - Mobile first (1 col) -> Tablet (2 col) -> Desktop (4 col) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 relative">
          
          {/* Connector line — Desktop only (lg) */}
          <div
            className="hidden lg:block absolute top-[22px] left-[12.5%] right-[12.5%] z-0"
            style={{ height: "0.5px", background: "#E5E0D5" }}
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center relative z-10 px-4 group"
            >
              {/* Circle - Scaled for better mobile view */}
              <div
                className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center mb-4 md:mb-5 text-xs md:text-sm font-bold shadow-sm"
                style={{
                  background: step.highlighted ? NAVY : GOLD,
                  color: step.highlighted ? GOLD : "#fff",
                  border: `3px solid #fff`,
                  fontFamily: "sans-serif",
                }}
              >
                {step.number}
              </div>

              <h3
                className="text-sm md:text-base font-bold mb-2 uppercase tracking-wide"
                style={{ color: NAVY }}
              >
                {step.title}
              </h3>
              
              <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed max-w-[200px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}