"use client";

import { SearchAddressProps } from "@/components/ui/search/SearchAddress";
import dynamic from "next/dynamic";

const SearchAddress = dynamic(
  () => import("@/components/ui/search/SearchAddress"),
  {
    ssr: false,
  },
);

function SearchAddressComponent({ onSelectLocation }: SearchAddressProps) {
  return (
    <div className="h-full w-full">
      <SearchAddress onSelectLocation={onSelectLocation} />
    </div>
  );
}

export default SearchAddressComponent;
