"use client";

import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { BlogImage, CodeBlock, VideoPlayer, MP4Video } from "../RichText";

function PostBody({ body }: { body: any }) {
  return (
    <TinaMarkdown
      content={body}
      components={{
        code_block: CodeBlock,
        BlogImage,
        VideoPlayer,
        MP4Video,
      }}
    />
  );
}

export default PostBody;
