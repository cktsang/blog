import Comments from "@/components/posts/Comments";
import Post from "@/components/posts/Post";
import client from "@/tina/__generated__/client";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const slug = (await params).slug;
  const temp = slug.replace(/^./, (char) => char.toUpperCase());
  const result = temp.split("-").join(" ");
  const title = result.slice(0, -6);

  return {
    title: title,
  };
}

async function PostPage({ params }: { params: { slug: string } }) {
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path");
  const category = pathname?.split("/")[1];
  const { slug } = await params;
  const result = await client.queries
    .post({
      relativePath: `/${category}/${slug}.mdx`,
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      return notFound();
    });
  return (
    <div className="mx-auto mb-4 grid max-w-screen-xl grid-cols-8 gap-4 p-4">
      <div className="col-span-full h-fit md:col-span-6 md:col-start-2 xl:col-span-4 xl:col-start-3">
        <Post {...result} />
        <Comments />
      </div>
    </div>
  );
}

export default PostPage;
