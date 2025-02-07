import { defineConfig } from "tinacms";
import { richTextComponents } from "./richtext-schema";
import { notFound } from "next/navigation";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    // tina: {
    //   mediaRoot: "",
    //   publicFolder: "public",
    // },
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      return pack.TinaCloudCloudinaryMediaStore;
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        format: "mdx",
        defaultItem: () => {
          return {
            date: new Date(),
            category: "blog",
          };
        },
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "titleIcon",
            label: "Title Icon",
            type: "string",

            options: [
              {
                value: "biceps",
                label: "Biceps",
              },
              {
                value: "bicycle",
                label: "Bicycle",
              },
              {
                value: "bookmark",
                label: "Bookmark",
              },
              {
                value: "car",
                label: "Car",
              },
              { value: "footprints", label: "Footprints" },
              {
                value: "languages",
                label: "Languages",
              },
              {
                value: "plane",
                label: "Plane",
              },
              {
                value: "utensils",
                label: "Utensils",
              },
            ],
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            isBody: true,
            templates: richTextComponents,
            toolbarOverride: [
              "heading",
              "bold",
              "italic",
              "link",
              "ul",
              "ol",
              "quote",
              "codeBlock",
              "embed",
              "raw",
            ],
          },
          {
            name: "date",
            label: "Date",
            type: "datetime",
            required: true,
            ui: {
              timeFormat: "HH:mm",
            },
          },
          {
            name: "category",
            label: "Category",
            type: "string",
            required: true,
            options: [
              {
                value: "blog",
                label: "Blog",
              },
              {
                value: "activities",
                label: "Activities",
              },
              {
                value: "visits",
                label: "Visits",
              },
              {
                value: "bookmarks",
                label: "bookmarks",
              },
            ],
          },

          {
            name: "gallery",
            label: "Image Gallery",
            type: "object",
            list: true,
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
            ],
            ui: {
              max: 9,
              itemProps: (item) => {
                return {
                  label: item?.alt,
                };
              },
            },
          },
          {
            name: "place",
            label: "Place",
            type: "object",
            list: true,
            fields: [
              {
                name: "name",
                label: "Name",
                type: "string",
              },
              {
                name: "latitude",
                label: "Latitude",
                type: "number",
              },
              {
                name: "longitude",
                label: "Longitude",
                type: "number",
              },
            ],
            ui: {
              itemProps: (item) => {
                return {
                  label: `${item.name || "Name"}: (${item.latitude || "Latitude"}, ${item.longitude || "Longitude"})`,
                };
              },
            },
          },
          {
            name: "workout",
            label: "Workout",
            type: "object",
            list: true,
            fields: [
              {
                name: "name",
                label: "Name",
                type: "string",
              },
              {
                name: "sets",
                label: "Sets",
                type: "object",
                list: true,
                fields: [
                  {
                    name: "reps",
                    label: "Reps",
                    type: "number",
                  },
                  {
                    name: "weight",
                    label: "Weight",
                    type: "number",
                  },
                ],
                ui: {
                  itemProps: (item) => {
                    return {
                      label: `${item?.reps || "0"} reps x ${item?.weight || "0"} kg`,
                    };
                  },
                },
              },
            ],
            ui: {
              itemProps: (item) => {
                return {
                  label: item?.name,
                };
              },
            },
          },
        ],
        indexes: [
          {
            name: "category-date",
            fields: [{ name: "category" }, { name: "date" }],
          },
        ],
        ui: {
          router: ({ document }) => {
            if (document._sys.filename) {
              return `/${document._sys.breadcrumbs[0]}/${document._sys.filename}`;
            }
            return notFound();
          },
          filename: {
            slugify: (values) => {
              const uniqueId = Date.now().toString().slice(-6);
              const baseSlug = (values.title || "")
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w\.\/-\s]/gi, "");
              return `${baseSlug}-${uniqueId}`;
              // return `${baseSlug}`;
            },
          },
        },
      },
    ],
  },
});
