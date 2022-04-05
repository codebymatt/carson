import { Box, Card, Flex, Heading, Radio, Stack, Text, TextInput } from "@sanity/ui";
import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { FiPlusCircle, FiMinusCircle, FiChevronDown, FiChevronRight } from "react-icons/fi";

import RadioButton from "./shared/RadioButton";
import Icon from "./shared/Icon";
import { updateRecipeInList } from "../state/recipeState";
import { useSelector } from "react-redux";
import store from "../store";

const Recipe = ({ recipe }) => {
  const recipeSelected = useSelector((state) => state.recipes.list[recipe.id].selected);

  const setRecipeSelected = () =>
    store.dispatch(updateRecipeInList({ ...recipe, selected: !recipeSelected }));
  const [opened, setOpened] = useState(false);
  const [updatedServings, setUpdatedServings] = useState(recipe.servings);

  return (
    <Card shadow={1} radius={2} padding={3}>
      <Header
        recipeName={recipe.name}
        recipeSelected={recipeSelected}
        setRecipeSelected={setRecipeSelected}
        recipeOpened={opened}
        setRecipeOpened={setOpened}
        updatedServings={updatedServings}
        setUpdatedServings={setUpdatedServings}
      />
      <Box display={opened ? "flex" : "none"}>
        <Ingredients
          ingredients={recipe.ingredients}
          originalServings={recipe.servings}
          updatedServings={updatedServings}
        />
      </Box>
    </Card>
  );
};

export default Recipe;

const Header = ({
  recipeName,
  recipeSelected,
  setRecipeSelected,
  recipeOpened,
  setRecipeOpened,
  updatedServings,
  setUpdatedServings,
}) => {
  return (
    <Flex direction="row" justify={"space-between"}>
      <Flex direction="row">
        <IconWrapper>
          <Icon
            icon={recipeOpened ? <FiChevronDown /> : <FiChevronRight />}
            label="Expand recipe"
            size="medium"
            handleFunc={() => setRecipeOpened(!recipeOpened)}
          />
        </IconWrapper>
        <Heading size={2}>{recipeName}</Heading>
      </Flex>
      <ServingAdjustor
        updatedServings={updatedServings}
        setUpdatedServings={setUpdatedServings}
        recipeSelected={recipeSelected}
      />
      <RadioButton selected={recipeSelected} setSelected={setRecipeSelected} />
    </Flex>
  );
};

const ServingAdjustor = ({ updatedServings, setUpdatedServings, recipeSelected }) => {
  const decrease = () => (updatedServings > 1 ? setUpdatedServings(updatedServings - 1) : null);
  return (
    recipeSelected && (
      <Flex style={{ marginRight: "1rem" }}>
        <Icon size="small" icon={<FiMinusCircle />} handleFunc={() => decrease()} />
        <Text
          style={{ textAlign: "center", margin: "0 0.8rem", minWidth: "5rem", lineHeight: 1.75 }}
        >
          {`${updatedServings} servings`}
        </Text>
        <Icon
          size="small"
          icon={<FiPlusCircle />}
          handleFunc={() => setUpdatedServings(updatedServings + 1)}
        />
      </Flex>
    )
  );
};

const Ingredients = ({ ingredients, originalServings, updatedServings }) => {
  return (
    <Stack style={{ padding: "1rem 2rem" }} space={4}>
      {_.map(ingredients, (ingredient) => {
        return <Text>{ingredientDescription(ingredient, originalServings, updatedServings)}</Text>;
      })}
    </Stack>
  );
};

const scaledValue = (value, originalServingCount, updatedServingCount) => {
  if (!updatedServingCount) return value;

  if (updatedServingCount == 0) return 0;

  if (originalServingCount != updatedServingCount) {
    const multiplier = (updatedServingCount * 1.0) / (originalServingCount * 1.0);
    return +(value * multiplier).toFixed(2);
  } else {
    return +value.toFixed(2);
  }
};

const ingredientDescription = (ingredient, originalServingCount, updatedServingCount) => {
  const { name, namePlural, unitSingular, unitPlural, value, description } = ingredient;

  const requiredValue = scaledValue(value, originalServingCount, updatedServingCount);

  const requiredName = requiredValue > 1 && namePlural ? namePlural : name;
  const requiredUnit = requiredValue > 1 && unitPlural ? unitPlural : unitSingular;
  const formattedDescription = description ? ` (${description})` : "";
  return `${requiredValue} ${requiredUnit} ${requiredName} ${formattedDescription}`;
};

const IconWrapper = styled.div`
  margin-right: 0.5rem;
  margin-top: -3px;
`;
