import { useEffect, useRef, useState } from "react";

const GOLD = "#C9A84C";
const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "K+", label: "Happy Travelers" },
  { value: 50, suffix: "+", label: "Destinations" },
  { value: 100, suffix: "%", label: "Satisfaction" },
];

// Helper Component for Count-Up Animation
const AnimatedNumber = ({ target }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 1500; // 1.5 Seconds animation
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    }, { threshold: 0.1 });

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={countRef}>{count}</span>;
};

export default function StatsStrip() {
  const stripRef = useRef(null);

  useEffect(() => {
    const els = stripRef.current?.querySelectorAll(".stat-item");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      el.style.transition = `all 0.6s cubic-bezier(0.2, 1, 0.3, 1) ${i * 0.1}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100);
    });
  }, []);

  return (
    <section 
      ref={stripRef}
      className="w-full py-6 md:py-8 relative overflow-hidden" // Padding adjusted for laptop
      style={{ background: `linear-gradient(to right, ${GOLD}, #B8962E)` }}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 relative z-10 px-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="stat-item group flex flex-col items-center justify-center py-3 text-center transition-transform duration-300 hover:scale-105"
          >
            {/* Divider Logic */}
            {i !== 0 && (
              <div className={`absolute left-0 h-10 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent ${i === 2 ? 'md:block hidden' : 'hidden md:block'}`} />
            )}

            <span
              className="text-3xl md:text-5xl font-light text-white tracking-tighter tabular-nums drop-shadow-sm"
              style={{ fontFamily: "serif" }}
            >
              <AnimatedNumber target={s.value} />{s.suffix}
            </span>
            
            <span
              className="text-[8px] md:text-[10px] uppercase tracking-[2px] mt-1 font-bold text-white/80 group-hover:text-white transition-colors"
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}