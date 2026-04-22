import BookingModal from "../components/queryForm/Bookingmodal ";
const HomeHero= () => (
  <div className="relative min-h-175 lg:min-h-[90vh] w-full flex items-center overflow-hidden font-sans">

    {/* ── Background ── */}
    <div
      className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.68), rgba(0,0,0,0.38)),
          url('https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=2000')
        `,
      }}
    >
      <div className="absolute inset-0 bg-black/15" />
    </div>

    {/* ── Content ── */}
    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 py-12 lg:py-20 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LEFT: Text */}
        <div className="text-left text-white space-y-4 md:space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight drop-shadow-md">
            Explore the <br className="hidden sm:block" />
            Beauty of <br />
            <span className="text-[#C4A036]">Uttarakhand</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-md leading-relaxed drop-shadow-sm">
            Discover pristine mountains, sacred temples, and unforgettable
            adventures in the lap of the Himalayas.
          </p>
          <div className="hidden lg:flex items-center gap-4 pt-4">
            <div className="h-1 w-20 bg-[#C4A036] rounded-full" />
            <p className="text-sm uppercase tracking-widest font-bold">Best Travel Agency</p>
          </div>
        </div>

        {/* RIGHT: BookingModal rendered inline — no popup, no state needed */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="w-full max-w-120">
            <BookingModal
              inline
              title="Quick Enquiry"
              subtitle="Fill in the details to get a custom quote for your trip."
              submitLabel="Send Inquiry"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
);

export default HomeHero;