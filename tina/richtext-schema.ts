import { Template } from "tinacms";

export const richTextComponents: Template[] = [
  {
    name: "BlogImage",
    label: "Image",
    fields: [
      {
        name: "image",
        label: "Image",
        type: "image",
      },
      {
        name: "alt",
        label: "Alt",
        type: "string",
      },
      {
        name: "caption",
        label: "Caption",
        type: "string",
      },
    ],
    ui: {
      itemProps: (item) => {
        return {
          label: item?.alt,
        };
      },
    },
  },
  {
    name: "VideoPlayer",
    label: "VideoPlayer",
    fields: [
      {
        name: "url",
        label: "Video URL",
        type: "string",
      },
    ],
    ui: {
      itemProps: (item) => {
        return {
          label: item?.url,
        };
      },
    },
  },
];
