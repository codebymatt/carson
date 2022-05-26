export default {
  title: "Source",
  name: "source",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    {
      title: "Type",
      name: "type",
      type: "string",
      options: {
        list: ["app", "cookbook", "notes"],
        layout: "radio",
      },
    },
  ],
};
