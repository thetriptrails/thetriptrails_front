import React from 'react';
import { Camera, MapPin } from 'lucide-react';
import { galleryImages } from './GalleryData';

const Gallery = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-10 bg-white relative overflow-hidden">
      {/* Decorative background - smaller on mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-cyan-50 blur-[80px] md:blur-[150px] opacity-40"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
          <div className="flex flex-col items-center justify-center gap-2 md:gap-4 mb-4">
            <div className="p-2 md:p-3 bg-cyan-50 rounded-xl md:rounded-2xl">
                <Camera className="w-6 h-6 md:w-9 md:h-9 text-[#C69E3D]" />
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-[#0B1D48] leading-tight">
              Photo <span className="text-[#C69E3D]">Gallery</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm md:text-xl max-w-2xl mx-auto px-4 font-medium leading-relaxed">
            Capture the raw, untouched essence of Uttarakhand through our cinematic lens.
          </p>
        </div>

        {/* Responsive Grid */}
        {/* Mobile: 1 col | Tablet: 2 col | Desktop: Masonry 3 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[250px] lg:auto-rows-[200px]">
          {galleryImages.map((image) => (
            <div 
              key={image.id} 
              className={`group relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-gray-100 shadow-md md:shadow-lg cursor-pointer transition-all duration-700 ${image.span} animate-fade-up`}
              style={{ animationDelay: `${image.delay}s`, animationFillMode: 'both' }}
            >
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
                onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Uttarakhand+View" }}
              />
              
              {/* Overlay: Mobile par 80% visible, Desktop par hover par slide-up */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 right-4 flex items-center justify-between transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                    <div>
                        <h5 className="text-white font-serif text-lg md:text-xl font-bold leading-none">{image.title}</h5>
                        <div className="flex items-center gap-1 mt-1.5 md:mt-2 text-white/80">
                          <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#C69E3D]" />
                          <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold">Uttarakhand</span>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button - Full width on mobile, Auto on Desktop */}
        <div className="mt-12 md:mt-20 px-4 md:px-0 text-center">
          <button className="w-full md:w-auto relative group bg-gradient-to-r from-[#C69E3D] to-[#E5C167] text-white font-bold py-4 md:py-4.5 px-12 rounded-full transition-all shadow-xl active:scale-95 overflow-hidden">
            <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative tracking-wider text-sm md:text-base">View Full Gallery</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Gallery;