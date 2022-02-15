import { FaStarHalfAlt } from "react-icons/fa";

export default {
  name: "rating",
  title: "Rating",
  type: "document",
  icon: FaStarHalfAlt,
  fields: [
    {
      name: "recipe",
      title: "Recipe",
      type: "reference",
      to: [{ type: "recipe" }],
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      options: {
        list: [1, 2, 3, 4, 5],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
  ],
  preview: {
    select: {
      recipeName: "recipe.name",
      firstName: "user.firstName",
      lastName: "user.lastName",
      rating: "rating",
    },
    prepare(selection) {
      const { recipeName, firstName, lastName, rating } = selection;

      return {
        title: `${recipeName} (${rating})`,
        subtitle: `${firstName} ${lastName}`,
      };
    },
  },
};
