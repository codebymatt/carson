import unit from "./unit";

export default {
  title: "Recipe",
  name: "recipe",
  type: "document",

  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "link", title: "Web link", type: "string" },
    { name: "servings", title: "Servings", type: "number" },
    { name: "calories", title: "Calories", type: "number" },
    {
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [
        {
          name: "ingredient",
          title: "Ingredient",
          type: "object",
          fieldsets: [{ name: "quantity", title: "Ingredient Quantity" }],
          fields: [
            { name: "ingredientName", title: "Name", type: "reference", to: [{ type: "item" }] },
            { name: "unit", title: "Unit", type: "reference", to: [{ type: "unit" }] },
            { name: "value", title: "Value", type: "number" },
            { name: "description", title: "Description", type: "string" },
          ],
          preview: {
            select: {
              ingredientName: "ingredientName.name",
              ingredientPlural: "ingredientName.plural",
              unitName: "unit.abbreviation",
              unitPlural: "unit.plural",
              unitValue: "value",
            },
            prepare(selection) {
              const { ingredientName, ingredientPlural, unitName, unitPlural, unitValue } =
                selection;
              return {
                title: unitValue !== 1 && ingredientPlural ? ingredientPlural : ingredientName,
                subtitle: `${unitValue} ${unitValue > 1 && unitPlural ? unitPlural : unitName}`,
              };
            },
          },
        },
      ],
    },
  ],
};
