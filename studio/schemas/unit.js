export default {
  title: "Unit",
  name: "unit",
  type: "document",
  initialValue: {
    type: "other",
  },

  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      title: "Abbreviation",
      name: "abbreviation",
      type: "string",
    },
    {
      title: "plural",
      name: "plural",
      type: "string",
    },
    {
      title: "Type",
      name: "type",
      type: "string",
      options: {
        list: ["other", "weight", "volume"],
        layout: "radio",
      },
    },
  ],
};
