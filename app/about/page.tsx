import Image from "next/image";
import { montserrat } from "@/app/fonts/fonts";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};
function page() {
  return (
    <div className={`h-full w-full space-y-4 px-2 md:space-y-8 md:px-8`}>
      <h1
        className={`${montserrat.className} w-full pb-2 pt-4 text-center text-3xl font-bold md:text-6xl`}
      >
        About Me
      </h1>
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 md:grid-cols-2 md:gap-8 lg:gap-4">
        <div className="place-items-center md:pt-6">
          <Image
            src="https://res.cloudinary.com/di81zcvbz/image/upload/v1735253979/IMG_13394604_SunnyDay_saxbjj.jpg"
            alt="profile picture"
            width={400}
            height={400}
            className="z-50 m-0 mx-auto aspect-square size-72 border-8 border-white bg-white object-cover object-center pb-8 shadow-md drop-shadow-md md:size-80 md:rotate-6 md:shadow-lg md:drop-shadow-md lg:size-96"
            priority
            quality={100}
          />
          <Image
            src="https://res.cloudinary.com/di81zcvbz/image/upload/v1735756926/IMG_7044_fpre7h.jpg"
            alt="profile picture"
            width={400}
            height={400}
            className="z-50 m-0 mx-auto hidden aspect-square size-72 -rotate-6 border-8 border-white bg-white object-cover object-center pb-8 shadow-lg drop-shadow-md md:block md:size-80 lg:size-96"
            priority
            quality={100}
          />
        </div>
        <div className="flex flex-col space-y-8 p-4 xl:text-lg">
          <div className="relative w-full space-y-4 pt-4 md:pt-0">
            <h2 className="text-2xl font-bold leading-10 lg:text-4xl">
              你好!
              <span className="inline-block animate-wave delay-200">👋</span>
              I'm Chikin Tsang.
            </h2>
            <p>
              I'm a front-end web developer from the Netherlands with a passion
              for crafting user-friendly web experiences. I started this blog as
              a space to share my thoughts, document my growth, and navigate my
              journey through both coding and life.
            </p>

            <p>
              Right now, I'm diving into React and Tailwind, exploring how to
              turn ideas into reality on the web. These tools have not only
              helped me build functional, responsive applications but also ones
              that are fun and intuitive to explore. And I'm just getting
              started.
            </p>
          </div>
          <div className="relative w-full">
            <ul className="space-y-4">
              <li className="rounded-lg bg-[#2E8B57]/20 p-4">
                🖥️ Sharpening my <span className="line-through">Googling</span>{" "}
                programming skills by experimenting with new tech and building
                projects like this blog.
              </li>
              <li className="rounded-lg bg-[#2E8B57]/20 p-4">
                🌍 I speak Dutch, English and a bit of Cantonese.
              </li>
              <li className="rounded-lg bg-[#2E8B57]/20 p-4">
                🏃🏻 I discovered calisthenics in 2019 and have been working out
                ever since. I also love playing badminton and going for a run.
              </li>
              <li className="rounded-lg bg-[#2E8B57]/20 p-4">
                🎹 I love learning new songs on the piano, although forgetting
                the last one as soon as I learn a new one? Not so much.
              </li>
              <li className="rounded-lg bg-[#2E8B57]/20 p-4">
                🕹️ Anime, movies and games enthusiast.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
