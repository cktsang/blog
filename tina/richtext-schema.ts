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
        required: true,
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
    name: "MP4Video",
    label: "MP4 Video",
    fields: [
      {
        name: "video",
        label: "Video",
        type: "image",
      },
    ],
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
  },
];
