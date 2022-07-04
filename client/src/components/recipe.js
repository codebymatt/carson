import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Stack,
  Text,
} from "@sanity/ui";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _, { isNil } from "lodash";
import {
  FiPlusCircle,
  FiMinusCircle,
  FiChevronDown,
  FiChevronRight,
  FiExternalLink,
} from "react-icons/fi";

import RadioButton from "./shared/RadioButton";
import Icon from "./shared/Icon";
import { updateRecipeInList } from "../state/recipeState";
import { useSelector } from "react-redux";
import store from "../store";
import { ingredientDescription } from "../utils/ingredientDescription";

const Recipe = ({ recipe }) => {
  const recipeSelected = useSelector((state) => state.recipes.list[recipe.id].selected);
  const [opened, setOpened] = useState(false);
  const [updatedServings, setUpdatedServings] = useState(recipe.servings);

  const setRecipeSelected = () => {
    store.dispatch(
      updateRecipeInList({
        ...recipe,
        selected: !recipeSelected,
        updatedServings: updatedServings,
      }),
    );
  };

  useEffect(() => {
    if (updatedServings !== recipe.updatedServings) {
      store.dispatch(
        updateRecipeInList({
          ...recipe,
          updatedServings: updatedServings,
        }),
      );
    }
  }, [recipe, updatedServings]);

  return (
    <Card shadow={1} radius={2} padding={2} marginTop={3}>
      <Header
        recipe={recipe}
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
  recipe,
  recipeSelected,
  setRecipeSelected,
  recipeOpened,
  setRecipeOpened,
  updatedServings,
  setUpdatedServings,
}) => {
  return (
    <Flex style={{ padding: "0.5rem 0.5rem" }} direction="row" justify={"space-between"}>
      <Flex style={{ width: "40%" }} direction="row">
        <Heading size={2}>{recipe.name}</Heading>
        <IconWrapper>
          <Icon
            icon={recipeOpened ? <FiChevronDown /> : <FiChevronRight />}
            label="Expand recipe"
            size="medium"
            handleFunc={() => setRecipeOpened(!recipeOpened)}
          />
        </IconWrapper>
      </Flex>
      <ServingAdjustor
        style={{ width: "30%" }}
        updatedServings={updatedServings}
        setUpdatedServings={setUpdatedServings}
        recipeSelected={recipeSelected}
      />
      <Flex align="center" justify="flex-end" style={{ width: "30%" }}>
        {(isNil(recipe.website) || !recipe.website) && (
          <Badge padding={2} style={{ marginRight: "1rem" }} tone="default">
            {`${recipe.sourceName} (${recipe.sourceType})`}
          </Badge>
        )}
        {recipe.website && (
          <LinkWrapper href={recipe.link} target="_blank">
            <LinkIcon icon={<FiExternalLink />} label="Recipe link" size="small" />
          </LinkWrapper>
        )}
        <RadioButton selected={recipeSelected} setSelected={setRecipeSelected} />
      </Flex>
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
    <Stack style={{ padding: "1rem 0.5rem" }} space={4}>
      {_.map(ingredients, (ingredient) => {
        return <Text>{ingredientDescription(ingredient, originalServings, updatedServings)}</Text>;
      })}
    </Stack>
  );
};

const IconWrapper = styled.div`
  margin-left: 0.5rem;
  margin-top: -3px;
`;

const LinkWrapper = styled.a`
  margin-top: 0.25rem;
  margin-right: 1rem;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

const LinkIcon = styled(Icon)`
  color: black;
`;
