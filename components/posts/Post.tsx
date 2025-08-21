import { PostQuery } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { DateTime } from "luxon";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import MapComponent from "../map/MapComponent";
import PostClient from "./PostClient";

export type PostProps = {
  data: PostQuery;
  variables: {
    relativePath: string;
  };
  query: string;
};

function Post(props: PostProps) {
  const data = props.data;

  return (
    <article className="relative overflow-hidden rounded-xl border bg-neutral-50 dark:bg-neutral-800">
      {data.post?.place && (
        <div className="m-0 h-32">
          {data.post?.place && (
            <MapComponent
              places={[
                {
                  title: data.post.place[0]?.name ?? "",
                  position: [
                    data.post.place[0]?.latitude ?? 0,
                    data.post.place[0]?.longitude ?? 0,
                  ],
                  zoom: 16,
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
            <div className="flex items-center justify-start space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
              <Calendar size={16} className="-mr-1" />
              <p data-tina-field={tinaField(data.post, "date")}>
                {DateTime.fromISO(data.post?.date).toLocaleString({
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <span>|</span>
              <Link
                className="text-hover-green capitalize no-underline"
                data-tina-field={tinaField(data.post, "category")}
                href={`/${data.post?.category}`}
              >
                {data.post?.category}
              </Link>
            </div>
            {data.post?.place && (
              <div className="inline-flex items-center space-x-1 text-sm leading-tight text-gray-700 dark:text-gray-300">
                <MapPin className="h-4 w-4" />
                <p>is at</p>
                <span className="font-semibold">
                  {data.post?.place[0]?.name}
                </span>
              </div>
            )}
          </div>
        </div>
        <PostClient {...props} />
      </div>
    </article>
  );
}

export default Post;
