import { HeartFilledIcon } from "@sanity/icons";
import { FaBook } from "react-icons/fa";

export default {
  name: "recipe",
  title: "Recipe",
  type: "document",
  icon: FaBook,
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
    {
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: {
        list: ["beginner", "intermediate", "advanced"],
        layout: "radio",
        direction: "horizontal",
      },
    },
    {
      name: "glass",
      title: "Glass",
      type: "reference",
      to: [{ type: "glass" }],
    },
    {
      name: "ice",
      title: "Ice",
      type: "reference",
      to: [{ type: "ice" }],
    },
    {
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [
        {
          type: "object",
          name: "ingredients",

          fields: [
            {
              name: "ingredient",
              title: "Ingredient",
              type: "reference",
              to: [{ type: "ingredient" }],
            },
            {
              name: "amount",
              title: "Amount",
              type: "number",
            },
            {
              name: "unit",
              title: "Unit",
              type: "string",
              options: {
                // TODO: Make list?
              },
            },
          ],
          preview: {
            select: {
              name: "ingredient.name",
              image: "ingredient.image",
              amount: "amount",
              unit: "unit",
            },
            prepare(selection) {
              const { name, image, amount, unit } = selection;

              return {
                title: `${name}`,
                subtitle: `${amount} ${unit}`,
                media: image,
              };
            },
          },
        },
      ],
    },
    {
      name: "instructions",
      title: "Instructions",
      type: "blockContent",
    },
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
};
