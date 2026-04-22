import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingModal from "../components/queryForm/Bookingmodal "; 

const GOLD = "#C9A84C";
const GOLD_DARK = "#A6832A";
const GOLD_LIGHT = "#F5E6C0";
const GOLD_BG = "#FBF6EC";
const GOLD_MUTED = "#E8D09A";
const TEXT_DARK = "#2D2D2D"; 
const WHITE = "#FFFFFF";
const TEXT_MUTED = "#9E8A5A";
const DIVIDER = "#EDD98A";

const destinations = [
  {
    id: "kedarnath",
    category: "Pilgrimage",
    title: "Kedarnath Temple",
    meta: "3,583m · May–Jun · 16km Trek",
    price: "₹28,000",
    rating: "4.9",
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "rishikesh",
    category: "Adventure",
    title: "Rishikesh Rafting",
    meta: "Grade 3–4 · Oct–Mar · 2 Days",
    price: "₹12,000",
    rating: "4.8",
    tag: null,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzBRk7THpv1fzX7E7cax09rJ5cBNld-KXgw&s",
  },
  {
    id: "nainital",
    category: "Hill Station",
    title: "Nainital Lakes",
    meta: "2,084m · Mar–Jun · 4 Days",
    price: "₹18,000",
    rating: "4.7",
    tag: null,
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "corbett",
    category: "Wildlife",
    title: "Jim Corbett Safari",
    meta: "Nov–Jun · 3 Days",
    price: "₹22,000",
    rating: "4.8",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "badrinath",
    category: "Pilgrimage",
    title: "Badrinath Darshan",
    meta: "3,133m · May–Jun · 5 Days",
    price: "₹20,000",
    rating: "4.9",
    tag: null,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVJm-G4DOGbn--s-ktyEszsckOWqeKZ3ielg&s",
  },
  {
    id: "valley-of-flowers",
    category: "Trek",
    title: "Valley of Flowers",
    meta: "3,658m · Jul–Sep · 6 Days",
    price: "₹24,000",
    rating: "4.8",
    tag: "Seasonal",
    image: "https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&q=80&w=800",
  },
];

function DestinationCard({ d, onSeeMore, onBookNow }) {
  return (
    <div
      style={{
        background: WHITE,
        border: `1px solid ${DIVIDER}`,
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: "0 4px 12px rgba(201,168,76,0.08)",
      }}
      className="hover-card"
    >
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <img
          src={d.image}
          alt={d.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.6) 100%)" }} />

        {d.tag && (
          <div style={{
            position: "absolute", top: 12, left: 12, background: GOLD, color: WHITE,
            fontSize: 9, fontWeight: 700, padding: "4px 10px", borderRadius: 4, textTransform: "uppercase",
          }}>
            {d.tag}
          </div>
        )}

        <div style={{
          position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.9)",
          color: TEXT_MUTED, fontSize: 10, fontWeight: 700, padding: "4px 8px", borderRadius: 4,
          display: "flex", alignItems: "center", gap: 3
        }}>
          <span style={{ color: GOLD_DARK }}>★</span> {d.rating}
        </div>

        <span style={{
          position: "absolute", bottom: 12, left: 14, fontSize: 10, letterSpacing: "0.15em",
          textTransform: "uppercase", color: WHITE, fontWeight: 600,
        }}>
          {d.category}
        </span>
      </div>

      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 18, fontWeight: 600, color: TEXT_DARK, margin: 0 }}>
          {d.title}
        </h3>

        <p style={{ fontSize: 11, color: TEXT_MUTED, margin: 0, lineHeight: 1.5 }}>
          {d.meta}
        </p>

        <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: "auto" }}>
          <span style={{ fontSize: 10, color: TEXT_MUTED }}>From</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: GOLD_DARK }}>{d.price}</span>
        </div>

        <div style={{ height: 1, background: DIVIDER, margin: "4px 0" }} />

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => onSeeMore(d.id)}
            style={{
              flex: 1, padding: "10px 0", fontSize: 11, fontWeight: 600,
              background: GOLD_BG, color: GOLD_DARK, border: `1px solid ${GOLD_MUTED}`,
              borderRadius: 8, cursor: "pointer",
            }}
          >
            Details
          </button>
          <button
            onClick={() => onBookNow(d)}
            style={{
              flex: 1.2, padding: "10px 0", fontSize: 11, fontWeight: 600,
              background: GOLD, color: WHITE, border: "none", borderRadius: 8, cursor: "pointer",
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedDestinations() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState(null);

  const handleSeeMore = (id) => navigate(`/destination/${id}`);
  
  const handleBookNow = (destination) => {
    setSelectedDest({
        title: destination.title,
        price: destination.price
    });
    setIsModalOpen(true);
  };

  return (
    <section style={{ width: "100%", background: "#FAFAF7", padding: "60px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: GOLD, display: "block", marginBottom: 8 }}>
            Top Uttarakhand Picks
          </span>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 36, fontWeight: 600, color: TEXT_DARK, margin: 0 }}>
            Our Most Loved <span style={{ color: GOLD }}>Destinations</span>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {destinations.map((d) => (
            <DestinationCard 
                key={d.id} 
                d={d} 
                onSeeMore={handleSeeMore} 
                onBookNow={handleBookNow} 
            />
          ))}
        </div>
      </div>

      {/* Integrated Modal */}
      {isModalOpen && (
        <BookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          packageData={selectedDest}
        />
      )}
    </section>
  );
}