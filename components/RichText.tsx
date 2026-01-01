import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
const Lightbox = dynamic(() => import("./lightbox/Lightbox"), {
  loading: () => <p>Loading image...</p>,
  ssr: false,
});

export const CodeBlock = ({ value, lang }: any) => {
  return (
    <SyntaxHighlighter language={lang || "jsx"} style={vscDarkPlus}>
      {value || ""}
    </SyntaxHighlighter>
  );
};

export const BlogImage = ({ image, alt, caption }: any) => {
  return (
    image && (
      <>
        <Lightbox
          gallery={[
            {
              image: image,
              alt: alt,
            },
          ]}
        />
        {caption && (
          <p className="text-center text-sm leading-3 text-gray-700 dark:text-gray-300">
            {caption}
          </p>
        )}
      </>
    )
  );
};

export const MP4Video = ({ video }: any) => {
  return (
    video && (
      <video loop autoPlay playsInline muted controls>
        <source src={video} type="video/mp4" />
      </video>
    )
  );
};

export const VideoPlayer = ({ url }: any) => {
  return (
    url && (
      <div className="aspect-video w-full overflow-hidden rounded-xl">
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          src={url}
          className="min-w-fit"
        />
      </div>
    )
  );
};
