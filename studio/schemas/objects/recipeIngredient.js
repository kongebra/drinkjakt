export default {
  name: "recipeIngredient",
  title: "Recipe Ingredient",
  type: "object",
  fields: [
    {
      name: "ingredient",
      title: "Ingredient",
      type: "reference",
      to: [{ type: "ingredient" }],
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
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
};
