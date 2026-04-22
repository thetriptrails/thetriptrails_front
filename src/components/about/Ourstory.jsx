const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";
const BG = "#FAFAF7";

export default function OurStory() {
  return (
    <section 
      style={{ background: BG }} 
      className="w-full py-12 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* RIGHT — IMAGE COLLAGE (Mobile Par Pehle Dikhega) */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {/* Main Large Image */}
            <div className="col-span-2 aspect-[16/9] rounded-2xl overflow-hidden shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200"
                alt="India Landscape"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Bottom Left */}
            <div className="aspect-square rounded-2xl overflow-hidden shadow-md group">
              <img
                src="https://wallpaperaccess.com/full/8931904.jpg"
                alt="Kedarnath Temple"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Bottom Right */}
            <div className="aspect-square rounded-2xl overflow-hidden shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=800"
                alt="Trekking"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* LEFT — TEXT CONTENT */}
        <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-center">
          <div className="inline-block w-12 h-1 mb-6" style={{ background: GOLD }}></div>
          
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-6"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            A Passion for <span style={{ color: GOLD }}>India</span>
          </h2>

          <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-600 max-w-xl">
            <p>
              Founded in 2009, our company was built on a deep passion for travel and a
              vision to showcase the diversity, culture, and beauty of India. What started
              as small journeys among friends gradually evolved into a mission.
            </p>

            <p>
              Over the past 15+ years, we have guided more than 10,000 travelers across 
              cultural, spiritual, and luxury getaways — always with a focus on quality and safety.
            </p>
          </div>

          {/* BLOCKQUOTE */}
          <blockquote
            className="mt-8 px-6 py-5 relative"
            style={{
              background: "#fff",
              border: `1px solid #E5E0D5`,
              borderLeft: `4px solid ${GOLD}`,
              borderRadius: "0 12px 12px 0",
            }}
          >
            <p
              className="text-sm md:text-[15px] italic leading-relaxed font-serif"
              style={{ color: NAVY }}
            >
              "Travel is not just about destinations — it is about connections and stories that stay with you forever."
            </p>

            <footer
              className="block text-[10px] md:text-xs uppercase tracking-[0.2em] mt-4 not-italic font-bold"
              style={{ color: GOLD }}
            >
              — Rahul Shukla, Founder
            </footer>
          </blockquote>
        </div>

      </div>
    </section>
  );
}