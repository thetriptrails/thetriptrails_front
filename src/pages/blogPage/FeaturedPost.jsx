import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { getAllPosts } from "../../services/post.service";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";
const OFF_WHITE = "#FAFAF7";

// 1. Accept activeFilter as a prop
export default function FeaturedPost({ activeFilter }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        // 2. Adjust API call based on filter
        // If your backend supports a category query, use it here:
        const query = { page: 1, limit: 1 };
        if (activeFilter !== "All") {
          query.category = activeFilter;
        }

        const data = await getAllPosts(query);
        
        // 3. Handle cases where a category might be empty
        const latestPost = data.posts?.[0] || data?.[0];
        setPost(latestPost || null);
      } catch (error) {
        console.error("Failed to load featured post", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [activeFilter]); // 4. Re-run effect when filter changes

  // If loading, show a skeleton or nothing
  if (loading) return (
    <div className="w-full bg-white px-4 py-16 text-center animate-pulse">
      <div className="max-w-7xl mx-auto h-96 bg-gray-50 rounded-3xl" />
    </div>
  );

  // 5. Hide the section if no post is found for a specific category
  if (!post) return null;

  return (
    <section className="w-full bg-white px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div>
            <span
              className="text-xs tracking-[4px] uppercase font-bold block mb-3"
              style={{ color: GOLD }}
            >
              {activeFilter === "All" ? "Editor's Choice" : `Top in ${activeFilter}`}
            </span>
            <h2 
              className="text-3xl md:text-5xl font-bold italic"
              style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
            >
              Featured Story
            </h2>
          </div>
          <div className="h-px grow bg-gray-100 mb-2 hidden md:block mx-8"></div>
        </div>

        {/* Main Card */}
        <div
          className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm group border border-gray-100"
          style={{ background: OFF_WHITE }}
        >
          {/* Left — Image Section */}
          <Link 
            to={`/blog/${post.slug}`} 
            className="relative min-h-87.5 lg:col-span-7 overflow-hidden cursor-pointer"
          >
            <img 
              src={post.image?.url || "https://via.placeholder.com/1400"} 
              alt={post.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            
            <div className="absolute top-6 left-6">
              <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                {post.category || "Travel Guide"}
              </span>
            </div>
          </Link>

          {/* Right — Content Section */}
          <div className="p-8 md:p-12 lg:col-span-5 flex flex-col justify-center bg-[#FDFDFB]">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px" style={{ background: GOLD }}></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {post.readTime || "10 Minute Read"}
              </span>
            </div>

            <Link to={`/blog/${post.slug}`}>
              <h3
                className="text-2xl md:text-3xl font-semibold leading-tight mb-5 hover:text-[#C9A84C] transition-colors cursor-pointer"
                style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
              >
                {post.title}
              </h3>
            </Link>

            <p className="text-sm leading-relaxed text-gray-500 mb-8 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between mt-auto pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-inner"
                  style={{ background: NAVY }}
                >
                  {post.author ? post.author.charAt(0) : "A"}
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: NAVY }}>
                    {post.author || "Admin"}
                  </p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-tighter">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <Link
                to={`/blog/${post.slug}`}
                className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all"
                style={{ color: GOLD }}
              >
                Read More 
                <span className="transition-transform group-hover:translate-x-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}