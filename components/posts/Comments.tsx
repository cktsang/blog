"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

function Comments() {
  const { theme } = useTheme();
  return (
    <div className="mt-8">
      <Giscus
        id="comments"
        repo="cktsang/blog-comments"
        repoId="R_kgDONvnpSQ"
        category="Blog Post Comments"
        categoryId="DIC_kwDONvnpSc4CmWE5"
        mapping="pathname"
        data-strict="0"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === "dark" ? "dark" : "light"}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}

export default Comments;
