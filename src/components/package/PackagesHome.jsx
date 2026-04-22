import React, { useState, useEffect } from 'react';
import PackageCard from './PackageCard.jsx';
import { getAllPackages } from '../../services/package.service';

const Packages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await getAllPackages("?limit=6");
        let data = res?.packages || res?.data || res || [];
        if (!Array.isArray(data)) data = [];
        setPackages(data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-[#C4A036] font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4 block animate-pulse">
            Exclusive Selection
          </span>
          <h2 className="text-3xl md:text-6xl font-serif font-black text-[#0B1D48] leading-tight">
            Premium <span className="text-[#C4A036]">Packages</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-lg max-w-xl mx-auto mt-6 font-medium leading-relaxed italic">
            "Carefully curated experiences for every type of traveler"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {packages.map((pkg, index) => (
            <PackageCard 
              key={pkg._id || index}
              title={pkg.title || pkg.name || "Exclusive Package"}
              duration={pkg.duration || `${pkg.nights || 2}N/${pkg.days || 3}D`}
              rating={pkg.rating || "4.8"}
              highlights={Array.isArray(pkg.includes) && pkg.includes.length > 0 ? pkg.includes.slice(0, 6) : ["Expert Guide", "Premium Stay", "Meals", "Transport"]}
              price={Number(pkg.price) || 15000}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;