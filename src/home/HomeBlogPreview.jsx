import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts as getPosts } from "../services/post.service";

export default function HomeBlogPreview() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const data = await getPosts();
        const postsArray = Array.isArray(data) ? data : data.posts || [];
        setLatestPosts(postsArray.slice(0, 3));
      } catch (err) {
        console.error("Error fetching preview posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  if (loading) return (
    <div className="h-40 flex items-center justify-center bg-[#FCFBFA]">
      <div className="w-6 h-6 border-2 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin" />
    </div>
  );

  return (
    <section className="w-full px-6 md:px-16 lg:px-24 py-14 bg-[#FCFBFA]">
      <div className="max-w-7xl mx-auto">
        
        {/* ── HEADER WITH ENHANCED EXPLORE BUTTON ── */}
        <div className="flex flex-row items-center justify-between mb-12">
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1410] leading-none">
              Latest <span className="italic font-medium text-[#C9A84C]">Stories</span>
            </h2>
          </div>

          <Link
            to="/blog"
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold rounded-full border border-[#C9A84C] transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(201,168,76,0.1)]"
          >
            {/* Hover Fill Effect */}
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-[#C9A84C] group-hover:opacity-100"></span>
            
            {/* Button Text */}
            <span className="relative text-[10px] tracking-[2px] uppercase text-[#C9A84C] group-hover:text-white flex items-center gap-2 transition-colors duration-300">
              Explore All <span className="text-sm">→</span>
            </span>
          </Link>
        </div>

        {/* ── ATTRACTIVE COMPACT GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Link
              key={post._id || post.slug}
              to={`/blog/${post.slug}`}
              className="group relative h-75 w-full overflow-hidden rounded-2xl bg-[#1A1410] shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Background Image with Ken Burns Effect */}
              <img 
                src={post.image?.url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"} 
                alt={post.title}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-40"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

              {/* Card Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="overflow-hidden mb-2">
                   <span className="text-[9px] font-bold uppercase tracking-[3px] text-[#C9A84C] block transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-serif font-bold leading-tight text-white mb-3 group-hover:text-[#E8D49A] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                {/* Meta Row: Appears smoothly on hover */}
                <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-[10px] text-white/60 font-medium">
                    By {post.author || "Admin"}
                  </span>
                  <span className="text-[10px] text-[#C9A84C]">
                    {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Subtle inner border on hover */}
              <div className="absolute inset-4 border border-[#C9A84C]/0 group-hover:border-[#C9A84C]/30 rounded-xl transition-all duration-500 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}