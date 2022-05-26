import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import unit from "./unit";
import item from "./item";
import recipe from "./recipe";
import source from "./source";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([unit, item, recipe, source]),
});
