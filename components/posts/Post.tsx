import { PostQuery } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { GalleryItem } from "../lightbox/Lightbox";
import { DateTime } from "luxon";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import Activity from "../Activity";
import PostBody from "./PostBody";
import LightboxComponent from "../lightbox/LightboxComponent";
import MapComponent from "../map/MapComponent";

export type PostProps = {
  data: PostQuery;
  variables: {
    relativePath: string;
  };
  query: string;
};

function Post(props: PostProps) {
  const data = props.data;

  const galleryItems: GalleryItem[] =
    data.post.gallery?.flatMap((item) =>
      item?.image
        ? [
            {
              image: item.image,
              alt: item.alt!,
            },
          ]
        : [],
    ) ?? [];

  return (
    <article className="relative overflow-hidden rounded-xl border bg-neutral-50">
      {data.post.place && (
        <div className="m-0 h-32">
          {data.post.place && (
            <MapComponent
              places={[
                {
                  title: data.post.place[0]?.name ?? "",
                  position: [
                    data.post.place[0]?.longitude ?? 0,
                    data.post.place[0]?.latitude ?? 0,
                  ],
                  zoom: 18,
                  path: data.post._sys.breadcrumbs,
                },
              ]}
            />
          )}
        </div>
      )}
      <div className="space-y-4 p-4">
        <div className="space-y-2 border-b pb-2">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center justify-start space-x-2 text-sm leading-6 text-gray-700">
              <Calendar size={16} className="-mr-1" />
              <p data-tina-field={tinaField(data.post, "date")} className="">
                {DateTime.fromISO(data.post.date).toLocaleString({
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <span>|</span>
              <Link
                className="text-hover-green capitalize"
                data-tina-field={tinaField(data.post, "category")}
                href={`/${data.post.category}`}
              >
                {data.post.category}
              </Link>
            </div>
            {data.post.place && (
              <div className="inline-flex items-center space-x-1 text-sm leading-tight text-gray-700">
                <MapPin className="h-4 w-4" />
                <p>is at</p>
                <span className="font-semibold">
                  {data.post.place[0]?.name}
                </span>
              </div>
            )}
          </div>

          <h1
            data-tina-field={tinaField(data.post, "title")}
            className="text-xl font-bold md:text-2xl"
          >
            {data.post.title}
          </h1>
        </div>
        <section
          data-tina-field={tinaField(data.post, "body")}
          className="dark:prose-reverse prose text-primary xl:prose-lg prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-a:text-emerald-700 prose-blockquote:border-[#2E8B57] prose-blockquote:text-lg prose-blockquote:text-gray-700 prose-ol:rounded-xl prose-ol:bg-zinc-200 prose-ol:py-1 prose-ul:rounded-lg prose-ul:bg-zinc-200 prose-ul:py-1 prose-li:marker:text-emerald-700 prose-blockquote:lg:text-xl"
        >
          <PostBody body={data.post.body} />
        </section>
        {data.post.workout && <Activity workout={data.post.workout as any} />}
        {data.post.gallery && (
          <LightboxComponent gallery={galleryItems} id={data.post.id} />
        )}
      </div>
    </article>
  );
}

export default Post;
