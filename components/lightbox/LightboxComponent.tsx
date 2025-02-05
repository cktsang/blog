"use client";

import { LightboxProps } from "@/components/lightbox/Lightbox";
import dynamic from "next/dynamic";
import { useMemo } from "react";

function LightboxComponent({ gallery, id }: LightboxProps) {
  const Lightbox = useMemo(
    () =>
      dynamic(() => import("@/components/lightbox/Lightbox"), {
        loading: () => <p>Loading images...</p>,
        ssr: false,
      }),
    [],
  );
  return (
    <div className="h-full w-full">
      <Lightbox gallery={gallery} id={id} />
    </div>
  );
}

export default LightboxComponent;
