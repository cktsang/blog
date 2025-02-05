import React, { Suspense } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Link } from "next-transition-router";

function Author() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-neutral-50 shadow">
      <Image
        src="/hongkong.jpg"
        alt="profile background"
        width={300}
        height={150}
        priority
        className="relative flex aspect-video h-32 object-cover object-center"
      />
      <Suspense
        fallback={
          <div className="absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white bg-neutral-50 object-cover object-center" />
        }
      >
        <Image
          src="https://res.cloudinary.com/di81zcvbz/image/upload/t_profile/v1738162332/IMG_5581_vvr4vn.jpg"
          alt="profile picture"
          width={112}
          height={112}
          quality={100}
          priority
          className="absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white object-cover object-center"
        />
      </Suspense>

      <div className="">
        <div className="px-4 pb-4 pt-10 text-center">
          <p className={`text-xl font-semibold`}>Chikin Tsang</p>
          <p className="text-sm text-gray-700">Front-end Developer</p>
          <p className="pt-4">
            Learn more <Link href="/about">about me</Link>.
          </p>
          <p className="pt-4 text-sm">
            <MapPin className="inline h-4 w-4" /> Utrecht, The Netherlands
          </p>
        </div>
      </div>
    </div>
  );
}

export default Author;
