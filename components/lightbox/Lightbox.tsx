"use client";

import { useEffect } from "react";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

export type GalleryItem = {
  image: string;
  alt: string;
};

export type LightboxProps = {
  gallery?: GalleryItem[];
  id?: string;
  square?: boolean;
};

function Lightbox({ gallery, id, square }: LightboxProps) {
  function getGridCols() {
    if (gallery) {
      if (gallery.length === 2) {
        return "grid-cols-2";
      }
      if (gallery.length > 2) {
        return "grid-cols-3";
      }
    }
    return "";
  }

  function getSize() {
    if (gallery) {
      if (gallery.length === 1) {
        return "500";
      }
      if (gallery.length === 2) {
        return "300";
      }
      if (gallery.length > 2) {
        return "175";
      }
    } else {
      return "500";
    }
    return "500";
  }

  useEffect(() => {
    GLightbox({
      touchNavigation: true,
      loop: false,
      selector: ".glightbox",
    });
  });

  return (
    <div
      className={`grid gap-1 ${getGridCols()} relative overflow-hidden rounded-xl`}
    >
      {gallery &&
        gallery.map((img, key) => (
          <Link
            href={img.image || ""}
            className="glightbox overflow-hidden"
            key={key}
            data-gallery={id || img.image}
          >
            <CldImage
              src={img.image}
              alt={img.alt! || img.image?.split("/").slice(-1)[0] || ""}
              width={getSize()}
              height={getSize()}
              className={`m-0 ${square ? "aspect-square" : "aspect-auto"} w-full object-cover duration-300 ease-in hover:scale-105`}
              data-gallery={id || img.image}
            />
          </Link>
        ))}
    </div>
  );
}

export default Lightbox;
