import source from "./source";
import unit from "./unit";
import tag from "./tag";

export default {
  title: "Recipe",
  name: "recipe",
  type: "document",

  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "website", title: "Website?", type: "boolean" },
    {
      name: "link",
      title: "Web link",
      type: "string",
      hidden: ({ document }) => !document.website,
    },
    {
      name: "source",
      title: "Source",
      type: "reference",
      hidden: ({ document }) => document.website,
      to: [{ type: "source" }],
      preview: {
        select: {
          title: "source.name",
          subtitle: "source.type",
        },
      },
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      options: {
        layout: "tags",
      },
    },
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
