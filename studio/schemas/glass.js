import { FaGlassMartini } from "react-icons/fa";
import { isUniqueAcrossType } from "../lib/isUnique";

export default {
  name: "glass",
  title: "Glass",
  type: "document",
  icon: FaGlassMartini,
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
        isUnique: isUniqueAcrossType("glass"),
      },
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      media: "image",
    },
  },
};
