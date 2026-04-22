import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "../../services/post.service";

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostBySlug(slug);
        setPost(data.post || data);
      } catch (err) {
        setError(err.msg || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      window.location.href
    )}&text=${encodeURIComponent(post?.title || "")}`;
    window.open(url, "_blank");
  };

  /* ── LOADING ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center gap-5">
        <div className="w-12 h-12 rounded-full border-[3px] border-[#EDE8DC] border-t-[#C9A84C] animate-spin" />
        <p className="font-serif text-[11px] tracking-[4px] uppercase text-[#A07830]">
          Loading Story
        </p>
      </div>
    );
  }

  /* ── ERROR ── */
  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center gap-4 px-6">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-2xl text-red-400">
          ✕
        </div>
        <p className="font-serif text-base text-red-600">{error}</p>
        <Link
          to="/blog"
          className="px-7 py-3 rounded-full border border-[#C9A84C] text-[#A07830] font-serif text-sm tracking-wide hover:bg-[#FBF7EE] transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  if (!post) return null;

  const initials = post.author
    ? post.author
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "A";

  return (
    <div className="min-h-screen bg-[#FDFCF8]">

      {/* ── HERO IMAGE ── */}
      <div className="relative h-[55vh] md:h-[68vh] w-full overflow-hidden">
        <img
          src={
            post.image?.url ||
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400"
          }
          alt={post.title}
          className="w-full h-full object-cover"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/40 to-black/80" />

        {/* Gold shimmer rule */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{
            background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
          }}
        />

        {/* Hero text block — sits at bottom */}
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-5 pb-12 md:pb-16">
          {/* Category pill */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C] bg-[#C9A84C]/15 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0" />
            <span className="text-[9px] font-bold tracking-[3px] uppercase text-[#E8D49A]">
              {post.category}
            </span>
          </div>

          <h1 className="font-serif text-[26px] md:text-5xl font-bold text-white leading-snug max-w-3xl drop-shadow-lg">
            {post.title}
          </h1>
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 pb-20">

        {/* ── CARD (overlaps hero) ── */}
        <div className="relative bg-white rounded-2xl border border-[#EDE8DC] shadow-[0_8px_48px_rgba(160,120,48,0.10),0_2px_8px_rgba(0,0,0,0.05)] -mt-10 md:-mt-16 z-10 px-5 py-8 md:px-12 md:py-12">

          {/* Gold top accent line */}
          <div
            className="absolute top-0 left-10 right-10 h-0.5 rounded-sm"
            style={{
              background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
            }}
          />

          {/* ── META ── */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pb-7 mb-7 border-b border-[#EDE8DC]">

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#F5EDD8] to-[#E8D49A] border-2 border-[#C9A84C] flex items-center justify-center font-serif font-bold text-[#A07830] text-sm shrink-0">
                {initials}
              </div>
              <div>
                <p className="text-[9px] font-bold tracking-[2px] uppercase text-[#6B5A44] mb-0.5">
                  Written By
                </p>
                <p className="font-serif text-sm font-bold text-[#1A1410]">
                  {post.author || "Admin"}
                </p>
              </div>
            </div>

            {/* Date + Read Time chips */}
            <div className="flex gap-3">
              <div className="px-4 py-2.5 rounded-xl bg-[#FBF7EE] border border-[#EDE8DC]">
                <p className="text-[8px] font-bold tracking-[2px] uppercase text-[#6B5A44] mb-0.5">
                  Date
                </p>
                <p className="text-[12px] font-semibold text-[#3D3020]">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-[#FBF7EE] border border-[#EDE8DC]">
                <p className="text-[8px] font-bold tracking-[2px] uppercase text-[#6B5A44] mb-0.5">
                  Read Time
                </p>
                <p className="text-[12px] font-semibold text-[#3D3020]">
                  {post.readTime || "6 Min"}
                </p>
              </div>
            </div>
          </div>

          {/* ── EXCERPT ── */}
          <div className="relative bg-[#FBF7EE] border border-[#EDE8DC] rounded-2xl px-6 pt-8 pb-6 mb-9">
            <div className="absolute -top-3.5 left-6 w-7 h-7 rounded-full bg-[#C9A84C] flex items-center justify-center text-white font-serif font-bold text-sm leading-none">
              "
            </div>
            <p className="font-serif text-lg md:text-xl italic text-[#A07830] leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* ── BODY ── */}
          <div className="font-serif text-base md:text-lg leading-[1.9] text-[#3D3020] whitespace-pre-line tracking-[0.01em]">
            {post.content}
          </div>

          {/* ── ORNAMENTAL DIVIDER ── */}
          <div className="flex items-center gap-4 my-10">
            <div className="flex-1 h-px bg-[#EDE8DC]" />
            <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
            <div className="flex-1 h-px bg-[#EDE8DC]" />
          </div>

          {/* ── TAGS ── */}
          {post.tags?.length > 0 && (
            <div className="mb-10">
              <p className="text-[9px] font-bold tracking-[3px] uppercase text-[#6B5A44] mb-3">
                Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-bold tracking-[1.5px] uppercase px-4 py-2 rounded-full bg-[#FBF7EE] border border-[#EDE8DC] text-[#A07830] cursor-pointer hover:bg-[#F5EDD8] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── SHARE ── */}
          <div className="rounded-2xl overflow-hidden border border-[#EDE8DC]">
            {/* Dark header */}
            <div className="bg-[#1A1410] px-6 py-5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C] flex items-center justify-center text-[#C9A84C] shrink-0">
                ✦
              </div>
              <div>
                <p className="font-serif text-sm font-bold text-white">
                  Enjoyed this story?
                </p>
                <p className="text-[11px] text-white/40 mt-0.5">
                  Share it with your community
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="bg-[#FDFCF8] px-6 py-5 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleShareTwitter}
                className="flex-1 py-3.5 rounded-xl bg-[#1A1410] text-white text-[11px] font-bold tracking-[1.5px] uppercase hover:opacity-80 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                Share on X
              </button>
              <button
                onClick={handleCopyLink}
                className={`flex-1 py-3.5 rounded-xl text-[11px] font-bold tracking-[1.5px] uppercase border transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 ${
                  copied
                    ? "bg-[#F5EDD8] border-[#C9A84C] text-[#A07830]"
                    : "bg-white border-[#EDE8DC] text-[#3D3020] hover:bg-[#FBF7EE]"
                }`}
              >
                {copied ? "✓ Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>

        {/* ── BACK TO BLOG — BELOW THE CARD ── */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#C9A84C] bg-white text-[#A07830] font-serif text-sm font-semibold tracking-wide shadow-sm hover:bg-[#FBF7EE] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200 inline-block">
              ←
            </span>
            Back to Blog
          </Link>
        </div>

      </div>
    </div>
  );
}