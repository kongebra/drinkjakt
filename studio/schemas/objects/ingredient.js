export default {
  name: "ingredient",
  title: "Ingredient",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
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
        // list: [''] // TODO: Create list ?
      },
    },
  ],

  preview: {
    select: {
      name: "name",
      amount: "amount",
      unit: "unit",
    },
    prepare(selection) {
      const { name, amount, unit } = selection;

      return {
        title: name,
        subtitle: `${amount} ${unit}`,
      };
    },
  },
};