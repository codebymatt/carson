import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useSelector } from "react-redux";
import { ingredientDescription } from "../utils/ingredientDescription";

import { Card, Heading, Stack, Text } from "@sanity/ui";

const reduceRecipes = (recipes) => {
  const items = _.reduce(
    recipes,
    (memo, recipe, recipeName) => {
      recipe.ingredients.forEach((ingredient) => {
        memo[ingredient.name]
          ? (memo[ingredient.name].value += ingredient.value)
          : (memo[ingredient.name] = ingredient);
      });

      return memo;
    },
    {},
  );

  console.log(items);
  return items;

  // return [{ name: "tomatoes" }, { name: "cucumbers" }];
};

const ShoppingList = () => {
  const listItems = useSelector((state) => state.shoppingList.list);

  if (_.isEmpty(listItems)) return <Heading>Create shopping lists from the recipes tab!</Heading>;

  return (
    <Stack style={{ padding: "1rem 1rem" }} space={4}>
      {_.map(listItems, (item) => {
        return <Text>{ingredientDescription(item, 1, 1)}</Text>;
      })}
    </Stack>
  );
};

export default ShoppingList;
