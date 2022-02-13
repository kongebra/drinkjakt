import { FaBook } from "react-icons/fa";
import { isUniqueAcrossType } from "../lib/isUnique";

export default {
  name: "recipe",
  title: "Recipe",
  type: "document",
  icon: FaBook,
  groups: [
    {
      name: "base",
      title: "Base Information",
    },
    {
      name: "media",
      title: "Media",
    },
    {
      name: "equipment",
      title: "Equipment",
    },
    {
      name: "instructions",
      title: "Instructions",
    },
  ],
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
      name: "description",
      title: "Description",
      type: "text",
      group: "base",
      rows: 3,
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      group: "media",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    },
    {
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      group: "instructions",
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
      group: "equipment",
      to: [{ type: "glass" }],
    },
    {
      name: "ice",
      title: "Ice",
      type: "reference",
      group: "equipment",
      to: [{ type: "ice" }],
    },
    {
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      group: "equipment",
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
                subtitle: amount && unit ? `${amount} ${unit}` : "",
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
      group: "instructions",
    },
  ],
  preview: {
    select: {
      name: "name",
      image: "image",
      ingredient0: "ingredients.0.ingredient.name",
      ingredient1: "ingredients.1.ingredient.name",
      ingredient2: "ingredients.2.ingredient.name",
    },
    prepare(selection) {
      const { name, ingredient0, ingredient1, ingredient2, image } = selection;

      const subtitle = [ingredient0, ingredient1, ingredient2]
        .filter((x) => x)
        .join(", ");

      return {
        title: name,
        subtitle: subtitle,
        media: image,
      };
    },
  },
};
