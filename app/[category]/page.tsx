import Author from "@/components/Author";
import { MapItem } from "@/components/map/Map";
import PostListComponent from "@/components/posts/PostList";
import client from "@/tina/__generated__/client";
import { montserrat } from "@/app/fonts/fonts";
import Heatmap from "@/components/Heatmap";
import type { Metadata } from "next";
import MapComponent from "@/components/map/MapComponent";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = (await params).category;
  const title = category.replace(/^./, (char) => char.toUpperCase());

  return {
    title: title,
  };
}

export async function generateStaticParams() {
  return [
    { category: "blog" },
    { category: "activities" },
    { category: "visits" },
    { category: "bookmarks" },
  ];
}

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const category = (await params).category;
  let result: any = [];
  let mapItems: MapItem[] = [];
  let totalCount = 0;

  switch (category) {
    case "blog":
      result = await client.queries.postConnection({
        sort: "date",
        last: 10,
      });
      break;

    case "activities":
    case "visits":
    case "bookmarks":
      result = await client.queries.postConnection({
        sort: "category-date",
        filter: { category: { in: [category] } },
        last: 10,
      });

      if (category === "activities") {
        const activities = await client.queries.postConnection({
          sort: "category-date",
          filter: { category: { in: ["activities"] } },
        });

        totalCount = activities.data.postConnection.totalCount;
      }

      if (category === "visits") {
        const allVisits = await client.queries.postConnection({
          sort: "category-date",
          filter: { category: { in: ["visits"] } },
        });

        totalCount = allVisits.data.postConnection.totalCount;
        mapItems =
          allVisits.data.postConnection.edges?.flatMap((post) => {
            if (!post?.node?.place?.[0]) return [];
            return [
              {
                title: post.node.place[0].name ?? "",
                position: [
                  post.node.place[0].latitude ?? 0,
                  post.node.place[0].longitude ?? 0,
                ],
                path: post.node._sys.breadcrumbs,
              },
            ];
          }) ?? [];
      }
      break;
  }

  return (
    <>
      <div className="">
        <h1
          className={`${montserrat.className} w-full pb-2 pt-4 text-center text-3xl font-bold capitalize md:text-6xl`}
        >
          {category}
        </h1>
        <div className="relative mx-auto grid max-w-screen-xl grid-cols-8 gap-4 p-2 md:p-8">
          <div className="sticky top-20 col-start-1 hidden h-fit w-full md:col-span-3 md:block lg:col-span-2">
            <Author />
          </div>
          <div className="col-span-8 col-start-1 h-fit space-y-8 md:col-span-5 md:col-start-4 md:space-y-12 lg:col-span-4 lg:col-start-3">
            {mapItems?.length > 0 && (
              <div className="h-48 w-full overflow-hidden rounded-xl shadow md:h-52 xl:h-72">
                <MapComponent places={mapItems} />
              </div>
            )}

            {category === "activities" && (
              <Heatmap
                days={105}
                dates={result.data.postConnection.edges?.map((post: any) => ({
                  date: post?.node?.date!,
                  count: 1,
                  path: post?.node?._sys.breadcrumbs!,
                }))}
              />
            )}

            {result.data?.postConnection.edges.length > 0 ? (
              <PostListComponent {...result} />
            ) : (
              <p className="p-4 text-center text-xl">No Posts Found</p>
            )}
          </div>
          {totalCount > 0 && (
            <div className="sticky top-20 hidden h-36 rounded-xl border bg-neutral-50 shadow lg:col-span-2 lg:col-start-7 lg:block">
              <div className="flex h-full w-full items-center justify-center px-2 xl:px-8">
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <p className="text-balance text-sm italic leading-5 text-gray-700">
                    {category === "activities"
                      ? "Activities completed:"
                      : category === "visits"
                        ? "Places visited around the world:"
                        : ""}
                  </p>
                  <p className="leading- text-4xl font-bold">{totalCount}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const revalidate = 3600;
