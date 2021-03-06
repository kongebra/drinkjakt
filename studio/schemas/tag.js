import { FaTags } from "react-icons/fa";
import { isUniqueAcrossType } from "../lib/isUnique";

export default {
  name: "tag",
  title: "Tags",
  type: "document",
  icon: FaTags,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 100,
        isUnique: isUniqueAcrossType("tag"),
      },
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
