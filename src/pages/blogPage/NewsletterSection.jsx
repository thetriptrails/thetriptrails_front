import { useState } from "react";

const GOLD = "#C9A84C";
const TEXT_DARK = "#1A1A1A";
const OFF_WHITE = "#FAFAF7";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <section
      className="w-full py-24 px-6 md:px-16 lg:px-24 text-center border-t border-gray-50"
      style={{ background: "#FFFFFF" }}
    >
      <div 
        className="max-w-4xl mx-auto p-10 md:p-16 rounded-[2rem] relative overflow-hidden shadow-sm"
        style={{ background: OFF_WHITE, border: `1px solid #F0EAD6` }}
      >
        {/* Subtle Decorative Gold Corner */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
          style={{ 
            borderRight: `2px solid ${GOLD}`, 
            borderTop: `2px solid ${GOLD}`,
            borderRadius: '0 2rem 0 0' 
          }}
        ></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <span
            className="text-[10px] tracking-[5px] uppercase font-bold block mb-6"
            style={{ color: GOLD }}
          >
            The Newsletter
          </span>

          <h2
            className="text-3xl md:text-5xl font-light leading-tight mb-6"
            style={{ fontFamily: "'Georgia', serif", color: TEXT_DARK }}
          >
            Join the <span className="font-bold italic" style={{ color: GOLD }}>Inner Circle</span>
          </h2>

          <p
            className="text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto"
            style={{ color: "#777" }}
          >
            Receive curated travel stories, hidden gems of the Himalayas, and 
            exclusive seasonal offers before anyone else.
          </p>

          {subscribed ? (
            <div
              className="rounded-full px-8 py-4 text-center mx-auto max-w-sm flex items-center justify-center gap-3 animate-pulse"
              style={{ background: "#FFF", border: `1px solid ${GOLD}` }}
            >
              <span style={{ color: GOLD }} className="text-xl font-bold">✓</span>
              <p className="text-sm font-bold uppercase tracking-widest" style={{ color: TEXT_DARK }}>
                You're on the list
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full text-sm outline-none transition-all border border-gray-200 focus:border-[#C9A84C] shadow-inner"
                style={{ background: "#FFF", color: TEXT_DARK }}
              />
              <button
                type="submit"
                className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-white rounded-full transition-all hover:shadow-xl active:scale-95"
                style={{ background: GOLD }}
              >
                Subscribe
              </button>
            </form>
          )}

          <p
            className="text-[9px] mt-6 uppercase tracking-[2px] font-medium"
            style={{ color: "#AAA" }}
          >
            Privacy Guaranteed • Unsubscribe Anytime
          </p>
        </div>
      </div>
    </section>
  );
}