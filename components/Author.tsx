import React, { Suspense } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Link } from "next-transition-router";

function Author() {
  return (
    <div className="flex h-full w-full flex-row gap-4 overflow-hidden rounded-xl border bg-neutral-50 p-4 shadow md:flex-col md:p-0">
      <Image
        src="/hongkong.jpg"
        alt="profile background"
        width={350}
        height={150}
        priority
        className="relative hidden aspect-video h-32 object-cover object-center md:flex"
      />
      <Suspense
        fallback={
          <div className="absolute left-1/2 top-0 hidden h-28 w-28 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white bg-neutral-50 object-cover object-center md:block" />
        }
      >
        <Image
          src="https://res.cloudinary.com/di81zcvbz/image/upload/t_profile/v1738162332/IMG_5581_vvr4vn.jpg"
          alt="profile picture"
          width={112}
          height={112}
          quality={100}
          priority
          className="m-auto h-28 w-28 rounded-full border-4 border-white object-cover object-center md:absolute md:left-1/2 md:top-0 md:m-0 md:-translate-x-1/2 md:translate-y-1/2"
        />
      </Suspense>

      <div className="flex-1">
        <div className="md:px-4 md:pb-4 md:pt-8 md:text-center">
          <p className="text-lg font-semibold md:text-xl">Chi Kin Tsang</p>
          <p className="text-xs text-gray-700 md:text-sm">
            Front-end Developer
          </p>
          <p className="py-2 md:py-4">
            Learn more <Link href="/about">about me</Link>.
          </p>
          <p className="flex items-center text-xs text-gray-700 md:justify-center md:text-sm">
            <MapPin className="mr-1 inline h-4 w-4" /> Utrecht, The Netherlands
          </p>
        </div>
      </div>
    </div>
  );
}

export default Author;
