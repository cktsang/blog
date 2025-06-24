"use client";

import { tinaField, useTina } from "tinacms/dist/react";
import Activity from "../Activity";
import LightboxComponent from "../lightbox/LightboxComponent";
import PostBody from "./PostBody";
import { PostQuery } from "@/tina/__generated__/types";
import { GalleryItem } from "../lightbox/Lightbox";

const PostClient = (props) => {
  const { data } = useTina<PostQuery>(props);

  const galleryItems: GalleryItem[] =
    data.post?.gallery?.flatMap((item) =>
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
    <>
      <div>
        <h1
          data-tina-field={tinaField(data.post, "title")}
          className="text-2xl font-bold md:text-3xl"
        >
          {data.post?.title}
        </h1>
      </div>
      <section
        data-tina-field={tinaField(data.post, "body")}
        className="dark:prose-reverse prose text-primary xl:prose-lg prose-h1:text-2xl prose-h2:my-2 prose-h2:text-xl prose-h3:text-lg prose-a:text-emerald-700 prose-blockquote:border-emerald-700 prose-blockquote:text-lg prose-blockquote:text-gray-700 prose-ol:rounded-xl prose-ol:bg-[#2E8B57]/20 prose-ol:py-1 prose-ol:pr-4 prose-ul:rounded-lg prose-ul:bg-[#2E8B57]/20 prose-ul:py-1 prose-ul:pr-4 prose-li:marker:text-emerald-700 prose-img:m-0 prose-blockquote:lg:text-xl"
      >
        <PostBody body={data.post?.body} />
      </section>
      {data.post?.workout && <Activity workout={data.post?.workout as any} />}
      {data.post?.gallery && (
        <LightboxComponent gallery={galleryItems} id={data.post.id} />
      )}
    </>
  );
};

export default PostClient;
