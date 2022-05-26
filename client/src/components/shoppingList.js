import React, { useState } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import { ingredientDescription } from "../utils/ingredientDescription";

import { Card, Checkbox, Flex, Heading, Stack, Text } from "@sanity/ui";

const ShoppingList = ({ hideChecked }) => {
  const listItems = useSelector((state) => state.shoppingList.list);
  if (_.isEmpty(listItems))
    return <Heading>Select some recipes and generate a new shopping list!</Heading>;

  return (
    <Stack style={{ padding: "1rem 1rem" }} space={4}>
      {_.map(listItems, (item) => {
        return <Ingredient item={item} hideChecked={hideChecked} />;
      })}
    </Stack>
  );
};

export default ShoppingList;

const Ingredient = ({ item, hideChecked }) => {
  const [checked, setChecked] = useState(false);

  const hideItem = hideChecked && checked;

  const toggleChecked = () => setChecked(!checked);

  return (
    !hideItem && (
      <Flex align={"center"}>
        <Checkbox style={{ marginRight: "0.8rem" }} checked={checked} onClick={toggleChecked} />
        <Text
          muted={checked}
          style={{ flex: 1, textDecoration: checked ? "line-through" : "none" }}
        >
          {ingredientDescription(item, 1, 1)}
        </Text>
      </Flex>
    )
  );
};
