import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiX, FiCheckCircle, FiEdit, FiTrash } from "react-icons/fi";

import { InnerPageWrapper } from "./shared/Wrappers";
import Icon from "./shared/Icon";
import { TextInput } from "./shared/Inputs";

import AddIngredient from "./AddIngredient";
import Ingredient from "./Ingredient";
import _ from "lodash";
import { ActionButton } from "./shared/Buttons";
import { useSelector } from "react-redux";
import { createRecipe, updateRecipe } from "../api/recipeApi";

const RecipeEditor = ({
  cancelRecipeAddition,
  currentRecipeId,
  recipeSavingEnabled,
  setRecipeSavingEnabled,
  removeIngredientFromRecipe,
  originalRecipeName = "",
  originalRecipeLink = "",
}) => {
  const currentRecipe = useSelector(
    (state) => state.recipes.currentRecipe,
  );

  const recipes = useSelector((state) => state.recipes.list);
  const [recipeName, setRecipeName] = useState("");
  const [recipeLink, setRecipeLink] = useState("");
  // const [currentRecipe, setCurrentRecipe] = useState({});
  const [showIngredientAddition, setShowIngredientAddition] =
    useState(false);

  const initializeExistingRecipeDetails = () => {
    if (currentRecipe === null) return;

    // const currentRecipe = recipes[currentRecipeId];

    setRecipeName(currentRecipe.name);
    setRecipeLink(currentRecipe.link);
  };

  const currentRecipeFields = () => {
    return { name: recipeName, link: recipeLink };
  };

  const addRecipe = async () => {
    const fields = currentRecipeFields();
    createRecipe(fields, () => setRecipeSavingEnabled(false));
  };

  const saveRecipe = async () => {
    const fields = currentRecipeFields();
    updateRecipe(fields, () => setRecipeSavingEnabled(false));
  };

  const actionFunc =
    currentRecipeId === null ? addRecipe : saveRecipe;

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
      const recipe = recipes[currentRecipeId];
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
      <RecipeInputs
        name={recipeName}
        link={recipeLink}
        setName={setRecipeName}
        setLink={setRecipeLink}
      />
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
          removeIngredientFromRecipe={removeIngredientFromRecipe}
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
          />
        ))}
    </InnerPageWrapper>
  );
};

export default RecipeEditor;

const RecipeInputs = ({ name, link, setName, setLink }) => {
  return (
    <BasicInfoWrapper>
      <TextInput
        value={name}
        updateFunc={setName}
        label="Recipe Name"
        placeholder="Something tasty.."
      />
      <TextInput
        value={link}
        updateFunc={setLink}
        label="Web Link"
        placeholder="https://example.com"
      />
    </BasicInfoWrapper>
  );
};
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
