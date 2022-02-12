import { HomeIcon } from "@sanity/icons";

export default {
  name: "frontpage",
  title: "Front Page",
  icon: HomeIcon,
  type: "document",
  fields: [
    {
      name: "featured_recipes",
      title: "Featured Recipes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "recipe" }] }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Front Page Settings",
      };
    },
  },
};
