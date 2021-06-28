import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiX, FiCheckCircle, FiEdit, FiTrash } from "react-icons/fi";

import { InnerPageWrapper } from "./shared/Wrappers";
import Icon from "./shared/Icon";
import { TextInput } from "./shared/Inputs";

import AddIngredient from "./AddIngredient";
import Ingredient from "./Ingredient";
import axios from "axios";
import _ from "lodash";
import { ActionButton } from "./shared/Buttons";

const RecipeEditor = ({
  cancelRecipeAddition,
  recipes,
  currentRecipeId,
  items,
  addRecipeToList,
  updateRecipeInList,
  recipeSavingEnabled,
  setRecipeSavingEnabled,
  originalRecipeName = "",
  originalRecipeLink = "",
}) => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeLink, setRecipeLink] = useState("");
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [showIngredientAddition, setShowIngredientAddition] =
    useState(false);

  const initializeExistingRecipeDetails = () => {
    if (currentRecipeId === null) return;

    const currentRecipe = recipes.find(
      (recipe) => recipe.id === currentRecipeId,
    );

    setRecipeName(currentRecipe.name);
    setRecipeLink(currentRecipe.link);
  };

  const createRecipe = () => {
    axios
      .post("/v1/recipes.json", {
        recipe: { name: recipeName, link: recipeLink },
      })
      .then((response) => {
        addRecipeToList(response.data.recipe);
        setRecipeSavingEnabled(false);
      })
      .catch((error) => console.log(error.message));
  };

  const saveRecipe = () => {
    axios
      .put(`/v1/recipes/${currentRecipeId}.json`, {
        recipe: { name: recipeName, link: recipeLink },
      })
      .then((response) => {
        updateRecipeInList(response.data.recipe);
        setRecipeSavingEnabled(false);
      })
      .catch((error) => console.log(error.message));
  };

  const actionFunc =
    currentRecipeId === null ? createRecipe : saveRecipe;

  useEffect(() => {
    if (
      recipeName != originalRecipeName ||
      recipeLink != originalRecipeLink
    )
      setRecipeSavingEnabled(true);
  }, [recipeName, recipeLink]);

  useEffect(() => {
    if (currentRecipeId != null) initializeExistingRecipeDetails();
    if (currentRecipeId !== null) {
      const recipe = recipes.find(
        (recipe) => recipe.id === currentRecipeId,
      );
      console.log(recipe);
      setCurrentRecipe(recipe);
    }
  }, []);

  return (
    <InnerPageWrapper>
      <HeaderWrapper>
        <Logo>CARSON</Logo>
        <IconContainer>
          <IconWrapper>
            <Icon
              icon={<FiCheckCircle />}
              size="medium"
              label="Save recipe"
              handleFunc={() => actionFunc()}
              disabled={!recipeSavingEnabled}
            />
          </IconWrapper>
          <IconWrapper>
            <Icon
              icon={<FiX />}
              size="medium"
              label="Cancel"
              handleFunc={cancelRecipeAddition}
            />
          </IconWrapper>
        </IconContainer>
      </HeaderWrapper>
      <BasicInfoWrapper>
        <TextInput
          value={recipeName}
          updateFunc={setRecipeName}
          label="Recipe Name"
          placeholder="Something tasty.."
        />
        <TextInput
          value={recipeLink}
          updateFunc={setRecipeLink}
          label="Web Link"
          placeholder="https://example.com"
        />
      </BasicInfoWrapper>
      {currentRecipeId != null && !showIngredientAddition && (
        <ButtonWrapper>
          <ActionButton
            text="Add Ingredient"
            onClick={() => setShowIngredientAddition(true)}
          />
        </ButtonWrapper>
      )}
      {currentRecipeId != null && showIngredientAddition && (
        <AddIngredient
          recipeId={currentRecipeId}
          closeFunc={() => setShowIngredientAddition(false)}
          availableItems={items}
        />
      )}
      {currentRecipeId === null && (
        <PlaceholderWrapper>
          Give your recipe a name before you add any ingredients.
        </PlaceholderWrapper>
      )}
      {!_.isEmpty(currentRecipe) &&
        currentRecipe.ingredients.map((ingredient) => (
          <Ingredient
            ingredient={ingredient}
            recipeId={currentRecipeId}
            availableItems={items}
          />
        ))}
    </InnerPageWrapper>
  );
};

export default RecipeEditor;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 1rem;
`;

const Logo = styled.h1`
  @media (max-width: 400px) {
    font-size: 1.5rem;
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-left: 1rem;
`;

const BasicInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const IngredientAdder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PlaceholderWrapper = styled.div`
  margin-top: 2rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const IngredientIconWrapper = styled.div`
  margin-left: 1rem;
`;

const IngredientName = styled.p``;
