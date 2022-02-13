import { FaTags } from "react-icons/fa";
import { isUniqueAcrossType } from "../lib/isUnique";

export default {
  name: "cateogry",
  title: "Category",
  icon: FaTags,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      group: "base",
      validation: (Rule) => Rule.required().min(2).max(64),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "base",
      options: {
        source: "name",
        maxLength: 100,
        isUnique: isUniqueAcrossType("recipe"),
      },
    },
    {
      name: "color",
      title: "Color",
      type: "colorPicker",
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
