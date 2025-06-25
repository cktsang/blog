"use client";

import client from "@/tina/__generated__/client";
import { PostConnectionQuery } from "@/tina/__generated__/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { montserrat } from "@/app/fonts/fonts";
import { BlogImage, VideoPlayer, MP4Video } from "../RichText";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  MapPin,
  BicepsFlexed,
  Bike,
  Car,
  Footprints,
  Languages,
  Plane,
  Utensils,
  Bookmark,
} from "lucide-react";
import { motion, MotionConfig, useInView } from "motion/react";
import { usePathname } from "next/navigation";
import Activity from "../Activity";
import LightboxComponent from "../lightbox/LightboxComponent";
import MapComponent from "../map/MapComponent";

type PostListComponentProps = {
  data: PostConnectionQuery;
  variables: {};
  query: string;
};

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

function PostListComponent(props: PostListComponentProps) {
  const pathname = usePathname()?.split("/")[1] || "";
  const data = props.data;
  const [postList, setPostList] = useState(data.postConnection.edges || []);
  const [cursor, setCursor] = useState(data.postConnection.pageInfo.endCursor);
  const loadMoreButtonRef = useRef<HTMLDivElement>(null);
  const buttonInView = useInView(loadMoreButtonRef);
  const [hasMorePosts, setHasMorePosts] = useState(
    data.postConnection.pageInfo.hasPreviousPage,
  );
  const [loadMorePosts, setLoadMorePosts] = useState(false);
  const [loading, setLoading] = useState(false);

  const getIcon = (titleIcon: string) => {
    switch (titleIcon) {
      case "biceps":
        return <BicepsFlexed />;

      case "bicycle":
        return <Bike />;

      case "bookmark":
        return <Bookmark />;

      case "car":
        return <Car />;

      case "footprints":
        return <Footprints />;

      case "languages":
        return <Languages />;

      case "plane":
        return <Plane />;

      case "utensils":
        return <Utensils />;
    }
  };

  const getMorePosts = async () => {
    if (hasMorePosts && pathname !== "blog") {
      setLoading((loading) => !loading);
      const result = await client.queries.postConnection({
        sort: "category-date",
        filter: { category: { in: [pathname] } },
        last: 10,
        before: cursor,
      });
      setPostList((postList) => [
        ...(postList || []),
        ...(result.data.postConnection.edges || []),
      ]);
      setCursor(result.data.postConnection.pageInfo.endCursor);
      setHasMorePosts(result.data.postConnection.pageInfo.hasPreviousPage);
      setLoading((loading) => !loading);
    } else {
      setLoading((loading) => !loading);
      const result = await client.queries.postConnection({
        sort: "date",
        last: 10,
        before: cursor,
      });
      setPostList((postList) => [
        ...(postList || []),
        ...(result.data.postConnection.edges || []),
      ]);
      setCursor(result.data.postConnection.pageInfo.endCursor);
      setHasMorePosts(result.data.postConnection.pageInfo.hasPreviousPage);
      setLoading((loading) => !loading);
    }
  };

  useEffect(() => {
    if (buttonInView && loadMorePosts) {
      getMorePosts();
    }
  }, [buttonInView, loadMorePosts]);

  return (
    <>
      <section className="z-0 flex flex-col">
        <div className="relative ml-5 space-y-4 border-l-2 pr-2 md:pr-0">
          {postList?.map((post: any) => (
            <div className="flex w-full" key={post.node.id}>
              <MotionConfig
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  variants={variants}
                  initial={"hidden"}
                  whileInView={"visible"}
                  viewport={{ once: true }}
                  className="sticky top-20 -ml-5 flex h-10 w-10 items-center justify-center rounded-full border bg-white p-4 shadow"
                >
                  <DateComponent data={post.node.date} />
                </motion.div>

                <motion.div
                  variants={variants}
                  initial={"hidden"}
                  whileInView={"visible"}
                  viewport={{ once: true }}
                  className="w-full"
                >
                  <article className="relative z-30 ml-2 min-h-24 flex-1 overflow-hidden rounded-xl border bg-neutral-50 shadow md:ml-4">
                    {post.node.place &&
                      post.node.place[0].latitude > 0 &&
                      post.node.place[0].longitude > 0 && (
                        <>
                          <Link
                            className="cursor-pointer"
                            href={`/${post.node.category}/${post.node._sys.filename}`}
                          >
                            <div className="pointer-events-none m-0 h-20 w-full lg:h-28">
                              <MapComponent
                                places={[
                                  {
                                    title: post.node.place[0].name,
                                    position: [
                                      post.node.place[0].latitude,
                                      post.node.place[0].longitude,
                                    ],
                                    zoom: 10,
                                    path: post.node._sys.breadcrumbs,
                                  },
                                ]}
                              />
                            </div>
                            {post.node.place[0].name && (
                              <div className="-mb-2 mt-2 px-2 md:px-4">
                                <div className="inline-flex items-center space-x-1 text-sm leading-tight text-gray-700">
                                  <MapPin className="h-4 w-4 text-emerald-700" />
                                  <p>is at</p>
                                  <span className="font-semibold">
                                    {post.node.place[0].name}
                                  </span>
                                </div>
                              </div>
                            )}
                          </Link>
                        </>
                      )}
                    <div className="space-y-4 overflow-hidden p-4">
                      <Link
                        href={`/${post.node.category}/${post.node._sys.filename}`}
                        className="inline-flex items-center space-x-2 no-underline"
                      >
                        {post.node.titleIcon && getIcon(post.node.titleIcon)}
                        <h2
                          className={`${montserrat.className} text-xl font-bold xl:text-2xl`}
                        >
                          {post.node.title}
                        </h2>
                      </Link>
                      {post.node.body && <ArticleBody {...post} />}
                      {post.node.workout && (
                        <Activity workout={post.node.workout} />
                      )}
                      {post.node.gallery && (
                        <LightboxComponent
                          gallery={post.node.gallery}
                          id={post.node.id}
                        />
                      )}
                    </div>
                  </article>
                </motion.div>
              </MotionConfig>
            </div>
          ))}
          {hasMorePosts && postList?.length! > 5 && (
            <div
              ref={loadMoreButtonRef}
              className="flex flex-col items-center overflow-hidden rounded-lg pb-4 pl-7 pt-4 md:pl-9"
            >
              {loading ? (
                <div
                  className="h-8 w-8 animate-spin rounded-full border-4 border-[#164128] border-e-transparent dark:text-white"
                  role="status"
                />
              ) : (
                <button
                  onClick={() => setLoadMorePosts(true)}
                  disabled={loading}
                  className="w-full rounded-lg bg-[#164128] px-10 py-2 font-bold text-[#FAF7F0] duration-300 ease-in-out hover:bg-[#164128]/90 disabled:cursor-progress"
                >
                  Load More
                </button>
              )}
            </div>
          )}
          <div />
        </div>
      </section>
    </>
  );
}

export default PostListComponent;

function DateComponent(date: { data: string }) {
  const dateObj = new Date(date.data);
  const day = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
  });
  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
  });
  return (
    <p className="text-center text-xs capitalize leading-4">
      {day.format(dateObj)}
      <br />
      {month.format(dateObj)}
    </p>
  );
}

function ArticleBody(props: any) {
  const ref = useRef<HTMLDivElement | null>(null!);
  const [showMore, setShowMore] = useState(false);

  const CodeBlock = ({ value, lang }: any) => {
    return (
      <div className="hidden">
        <SyntaxHighlighter language={lang || "jsx"} style={vscDarkPlus}>
          {value || ""}
        </SyntaxHighlighter>
      </div>
    );
  };

  useEffect(() => {
    if (!ref.current) return;
    if (ref) {
      const resizeObserver = new ResizeObserver(() => {
        const height = ref.current?.getBoundingClientRect().height;
        height && setShowMore(height > 200);
      });

      resizeObserver.observe(ref.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <div
      ref={ref}
      className="dark:prose-reverse prose relative line-clamp-[10] text-primary xl:prose-lg prose-h1:text-2xl prose-h2:my-0 prose-h2:text-xl prose-h3:text-lg prose-a:text-emerald-700 prose-blockquote:border-emerald-700 prose-blockquote:text-gray-700 prose-ol:rounded-xl prose-ol:bg-[#2E8B57]/20 prose-ol:py-1 prose-ol:pr-4 prose-ul:rounded-lg prose-ul:bg-[#2E8B57]/20 prose-ul:py-1 prose-ul:pr-4 prose-li:marker:text-emerald-700 prose-img:m-0 lg:line-clamp-[8]"
    >
      <TinaMarkdown
        content={props.node.body}
        components={{
          code_block: CodeBlock,
          BlogImage,
          VideoPlayer,
          MP4Video,
        }}
      />
      {showMore && (
        <div className="absolute bottom-0 grid h-36 w-full place-items-end justify-items-center bg-gradient-to-b from-transparent via-neutral-50/70 to-neutral-50 pb-8">
          <Link href={`/${props.node.category}/${props.node._sys.filename}`}>
            <button className="rounded-lg border bg-white px-10 py-1 text-base font-bold text-primary shadow-md drop-shadow-md duration-200 ease-in-out hover:text-emerald-700 md:py-2">
              Show More
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
