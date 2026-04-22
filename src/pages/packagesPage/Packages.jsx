import { useState } from "react";
import PackagesHero from "./PackagesHero";
import PackagesGrid from "./PackagesGrid";
import ComparisonTable from "./ComparisonTable";
import PackagesFAQ from "./PackagesFAQ";
import PackagesCTA from "./PackagesCTA";

export default function Packages() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <main className="w-full overflow-x-hidden">
      <PackagesHero
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <PackagesGrid activeFilter={activeFilter} />
      <ComparisonTable />
      <PackagesFAQ />
      <PackagesCTA />
    </main>
  );
}