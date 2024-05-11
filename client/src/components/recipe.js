import { Badge, Box, Card, Flex, Heading, Stack, Text } from "@sanity/ui";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _, { isNil } from "lodash";
import {
  FiPlusCircle,
  FiMinusCircle,
  FiChevronDown,
  FiChevronRight,
  FiExternalLink,
  FiPlus,
  FiX,
} from "react-icons/fi";

// import RadioButton from "./shared/RadioButton";
import Icon from "./shared/Icon";
import {
  addSelectedRecipe,
  removeSelectedRecipe,
  updateRecipeInList,
  updateServingsRemaining,
} from "../state/recipeState";
import { useSelector } from "react-redux";
import store from "../store";
import { ingredientDescription } from "../utils/ingredientDescription";

const Recipe = ({ recipe, selected }) => {
  // const recipeSelected = useSelector((state) => state.recipes.list[recipe._id].selected);
  // const [recipeSelected, setRecipeSelected] = useState(false);
  const [opened, setOpened] = useState(false);
  const [updatedServings, setUpdatedServings] = useState(recipe.servings);

  const selectRecipe = (recipe) => {
    store.dispatch(addSelectedRecipe(recipe));
  };

  const deselectRecipe = (id) => store.dispatch(removeSelectedRecipe(id));

  // const selectRecipe = () => {
  //   // We're toggling this to the opposite of the existing value.
  //   if (!recipeSelected) {
  //     store.dispatch(addSelectedRecipe(recipe));
  //   } else {
  //     store.dispatch(removeSelectedRecipe(recipe.id));
  //   }

  //   // updateRecipeInList({
  //   //   ...recipe,
  //   //   selected: selected,
  //   //   updatedServings: updatedServings,
  //   // }),
  //   // );

  //   // if (selected) {
  //   //   store.dispatch(addSelectedRecipe(recipe));
  //   // } else {
  //   //   store.dispatch(removeSelectedRecipe(recipe.id));
  //   // }
  // };

  const updateServings = (recipeId, delta) => {
    if (delta != 0) {
      store.dispatch(updateServingsRemaining({ recipeId, delta }));
    }
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
        selectRecipe={selectRecipe}
        deselectRecipe={deselectRecipe}
        recipeOpened={opened}
        setRecipeOpened={setOpened}
        updatedServings={updatedServings}
        updateServings={updateServings}
        selected={selected}
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
  recipeOpened,
  setRecipeOpened,
  updatedServings,
  updateServings,
  selected,
  selectRecipe,
  deselectRecipe,
}) => {
  const showSource = (isNil(recipe.website) || !recipe.website) && !isNil(recipe.sourceType);

  return (
    <Flex style={{ padding: "0.5rem 0.5rem" }} direction="column">
      <Flex direction="row" justify={"space-between"}>
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
        {selected && (
          <ServingAdjustor
            style={{ width: "30%" }}
            recipeId={recipe.id}
            servings={updatedServings}
            updateServings={updateServings}
          />
        )}
        <Flex align="center" justify="flex-end" style={{ width: "30%" }}>
          {showSource && (
            <Badge padding={2} style={{ marginRight: "1rem" }} tone="default">
              {`${recipe.sourceName} (${recipe.sourceType})`}
            </Badge>
          )}
          {recipe.website && (
            <LinkWrapper href={recipe.link} target="_blank">
              <LinkIcon icon={<FiExternalLink />} label="Recipe link" size="small" />
            </LinkWrapper>
          )}
          {!selected && (
            <Icon
              icon={<FiPlus />}
              label="Add to meal plan"
              size="small"
              handleFunc={() => selectRecipe(recipe)}
            />
          )}
          {selected && (
            <Icon
              icon={<FiX />}
              label="Remove from meal plan"
              size="small"
              handleFunc={() => deselectRecipe(recipe.id)}
            />
          )}
        </Flex>
      </Flex>
      <Flex style={{ marginTop: "0.5rem" }}>
        {recipe.tags.map((tag, index) => (
          <Tag key={index} tag={tag} />
        ))}
      </Flex>
    </Flex>
  );
};

const ServingAdjustor = ({ recipeId, servings, updateServings }) => {
  const decrease = () => (servings > 1 ? updateServings(recipeId, -1) : null);
  return (
    <Flex style={{ marginRight: "1rem" }}>
      <Icon size="small" icon={<FiMinusCircle />} handleFunc={() => decrease()} />
      <Text style={{ textAlign: "center", margin: "0 0.8rem", minWidth: "5rem", lineHeight: 1.75 }}>
        {`${servings} ${servings > 1 ? "servings" : "serving"}`}
      </Text>
      <Icon size="small" icon={<FiPlusCircle />} handleFunc={() => updateServings(recipeId, 1)} />
    </Flex>
  );
};

const Ingredients = ({ ingredients, originalServings, updatedServings }) => {
  return (
    <Stack style={{ padding: "1rem 0.5rem" }} space={4}>
      {_.map(ingredients, (ingredient, index) => {
        return (
          <Text key={index}>
            {ingredientDescription(ingredient, originalServings, updatedServings)}
          </Text>
        );
      })}
    </Stack>
  );
};

const Tag = ({ tag }) => {
  return (
    <Box
      style={{
        fontSize: "0.8rem",
        fontWeight: "bold",
        padding: "0.4rem 0.7rem",
        marginRight: "0.5rem",
        borderRadius: "100rem",
        backgroundColor: `${tag.color}`,
        color: "black",
      }}
    >
      {tag.name}
    </Box>
  );
};

const IconWrapper = styled.div`
  margin-left: 0.5rem;
  margin-top: -3px;
`;

const LinkWrapper = styled.a`
  margin-right: 1rem;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

const LinkIcon = styled(Icon)`
  color: black;
`;
