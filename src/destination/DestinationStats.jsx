import React, { useState, useEffect, useRef } from "react";

const GOLD = "#C9A84C";

// Pan-India Statistics
const indiaStats = [
  { value: 28, suffix: "+", label: "States & UTs" },
  { value: 40, suffix: "+", label: "UNESCO Sites" },
  { value: 100, suffix: "+", label: "Wildlife Parks" },
  { value: 500, suffix: "+", label: "Heritage Sites" },
];

function Counter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasStarted(true); },
      { threshold: 0.1 } // Trigger earlier for better mobile experience
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return <span ref={countRef}>{count.toLocaleString()}</span>;
}

export default function DestinationStats() {
  return (
    <section 
      className="w-full py-10 md:py-16 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${GOLD} 0%, #B8962E 100%)`,
      }}
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-64 h-64 rounded-full bg-white blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0">
          {indiaStats.map((s, idx) => (
            <div
              key={s.label}
              className={`group flex flex-col items-center justify-center px-4 text-center transition-all duration-500
                ${idx % 2 !== 0 ? 'border-l-0 sm:border-l-[0.5px]' : ''} 
                ${idx !== 0 ? 'lg:border-l-[0.5px]' : ''} 
                border-white/20`}
            >
              <div className="relative mb-2">
                <span className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tighter flex items-baseline">
                  <Counter end={s.value} />
                  <span className="text-xl md:text-2xl font-light opacity-90 ml-1">{s.suffix}</span>
                </span>
                {/* Glow on hover */}
                <div className="absolute -inset-4 bg-white/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
              </div>
              
              <p
                className="text-[10px] md:text-xs uppercase tracking-[4px] font-bold text-white/80 group-hover:text-white transition-colors"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}