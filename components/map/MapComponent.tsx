"use client";

import { MapProps } from "@/components/map/Map";
import dynamic from "next/dynamic";
import { useMemo } from "react";

function MapComponent({ places }: MapProps) {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/Map"), {
        loading: () => <p>Loading map...</p>,
        ssr: false,
      }),
    [],
  );
  return (
    <div className="h-full w-full">
      <Map places={places} />
    </div>
  );
}

export default MapComponent;
