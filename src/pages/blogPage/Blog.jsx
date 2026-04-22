import { useState } from "react";
import BlogHero from "./BlogHero";
import FeaturedPost from "./FeaturedPost";
import BlogGrid from "./BlogGrid";
import NewsletterSection from "./NewsletterSection";

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <main className="w-full overflow-x-hidden">
      <BlogHero
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <FeaturedPost activeFilter={activeFilter} />
      <BlogGrid activeFilter={activeFilter} />

      <NewsletterSection />
    </main>
  );
}