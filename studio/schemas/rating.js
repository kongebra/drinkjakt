import { StarIcon } from "@sanity/icons";

export default {
  name: "rating",
  title: "Rating",
  type: "document",
  icon: StarIcon,
  fields: [
    {
      name: "recipe",
      title: "Recipe",
      type: "reference",
      to: [{ type: "recipe" }],
    },
    {
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
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
