"use client";

import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { BlogImage, CodeBlock, VideoPlayer } from "../RichText";

function PostBody({ body }: { body: any }) {
  return (
    <TinaMarkdown
      content={body}
      components={{
        code_block: CodeBlock,
        BlogImage,
        VideoPlayer,
      }}
    />
  );
}

export default PostBody;
