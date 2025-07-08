import Comments from "@/components/posts/Comments";
import Post from "@/components/posts/Post";
import client from "@/tina/__generated__/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { category: string; slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const temp = slug.replace(/^./, (char) => char.toUpperCase());
  const result = temp.split("-").join(" ");
  const title = result.slice(0, -6);

  return {
    title: title,
  };
}

export async function generateStaticParams() {
  const posts = await client.queries.postConnection();
  return (
    posts.data.postConnection.edges?.map((post) => ({
      category: post?.node?.category,
      slug: post?.node?._sys.filename,
    })) || []
  );
}

async function PostPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const { category, slug } = params;

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
      <div className="col-span-full h-fit lg:col-span-6 lg:col-start-2 xl:col-span-4 xl:col-start-3">
        <Post {...result} />
        <Comments />
      </div>
    </div>
  );
}

export default PostPage;
