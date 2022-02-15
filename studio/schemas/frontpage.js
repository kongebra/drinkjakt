import { FaHome } from "react-icons/fa";

export default {
  name: "frontpage",
  title: "Front Page",
  icon: FaHome,
  type: "document",
  fields: [
    {
      name: "featured_recipes",
      title: "Featured Recipes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "recipe" }] }],
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
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
