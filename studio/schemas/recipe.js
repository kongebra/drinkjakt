import { HeartFilledIcon } from "@sanity/icons";

export default {
  name: "recipe",
  title: "Recipe",
  type: "document",
  icon: HeartFilledIcon,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 100,
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [{ type: "ingredient" }],
    },
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
};
