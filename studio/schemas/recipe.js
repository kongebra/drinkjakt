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
      codegen: { required: true },
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
        auto: true,
      },
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      group: "base",
      rows: 3,
    },
    {
      name: "viewCount",
      title: "View Count",
      description:
        "Count how many times the recipe has been viewed (View on the details page)",
      type: "number",
      group: "base",
      readOnly: true,
      initialValue: 0,
      validation: (Rule) => Rule.positive(),
      codegen: { required: true },
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
      codegen: { required: true },
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
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
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
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      of: [{ type: "recipeIngredient" }],
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
