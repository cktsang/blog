import React, { Suspense } from "react";
import Image from "next/image";
import { MailIcon, MapPin } from "lucide-react";
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
            Learn more{" "}
            <Link href="/about" className="font-semibold">
              about me
            </Link>
            .
          </p>
          <p className="flex items-center text-xs text-gray-700 md:justify-center md:text-sm">
            <MapPin className="mr-1 inline h-4 w-4" /> Utrecht, The Netherlands
          </p>
          <div className="mt-2 inline-flex space-x-2">
            <a href="https://github.com/cktsang" aria-label="GitHub">
              <svg
                className="h-6 w-6 fill-current"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/chi-kin-tsang-1937bb132/"
              aria-label="LinkedIn"
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
              >
                <title>LinkedIn</title>
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
              </svg>
            </a>
            <a href="mailto:ck.tsang@hotmail.com" aria-label="Email">
              <MailIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Author;
