import Author from "@/components/Author";
import PostListComponent from "@/components/posts/PostList";
import client from "@/tina/__generated__/client";
import { montserrat } from "@/app/fonts/fonts";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CK's Corner",
};

export default async function Home() {
  const result = await client.queries.postConnection({
    sort: "date",
    last: 5,
  });

  return (
    <>
      <div className="">
        <div className="block px-4 pt-4 md:hidden md:p-0">
          <Author />
        </div>
        <h1
          className={`${montserrat.className} w-full pb-2 pt-4 text-center text-3xl font-bold md:text-6xl`}
        >
          Recent Posts
        </h1>
        <div className="relative mx-auto grid max-w-screen-xl grid-cols-8 gap-4 p-2 md:p-8">
          <div className="sticky top-20 col-start-1 hidden h-fit w-full md:col-span-3 md:block lg:col-span-2">
            <Author />
          </div>
          <div className="col-span-8 col-start-1 h-fit md:col-span-5 md:col-start-4 lg:col-span-4 lg:col-start-3">
            <PostListComponent {...result} />
          </div>
          <div className="sticky top-20 hidden h-fit rounded-xl border bg-neutral-50 shadow lg:col-span-2 lg:col-start-7 lg:block">
            <div className="flex h-full w-full items-center justify-center p-4">
              <div className="flex w-fit flex-col space-y-4">
                <h3 className="text-lg font-medium leading-normal">
                  What am I currently doing?
                </h3>
                <ol className="space-y-2 pl-4 text-base">
                  <li className="list-['\01F4BB'] pl-2">
                    Learning React, Tailwind and{" "}
                    <Link href="https://motion.dev/">Motion</Link>
                  </li>

                  <li className="list-['\01F3B9'] pl-2">
                    Practicing this{" "}
                    <Link href="https://www.youtube.com/watch?v=hrTzJD62zt0">
                      piano arrangement
                    </Link>{" "}
                    of the Goblin OST
                  </li>
                  <li className="list-['\01F3C3'] pl-2">
                    Recovering from a tennis elbow
                  </li>
                  <li className="list-['\01F30D'] pl-2">
                    Trying{" "}
                    <Link href="https://www.lingodeer.com">Lingodeer</Link> to
                    learn Mandarin
                  </li>
                  <li className="list-['\01F4FA'] pl-2">
                    Watching season 2 of{" "}
                    <Link href="https://myanimelist.net/anime/58567/Ore_dake_Level_Up_na_Ken_Season_2__Arise_from_the_Shadow">
                      Solo Leveling
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
