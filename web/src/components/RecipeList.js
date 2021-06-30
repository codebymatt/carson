import React from "react";
import styled from "styled-components";

import { FiEdit, FiTrash } from "react-icons/fi";

import Card from "./shared/Card";
import axios from "axios";
import Icon from "./shared/Icon";
import { useSelector } from "react-redux";

const RecipeList = ({ deleteRecipeFromList, startRecipeEditing }) => {
  const recipes = useSelector((state) => state.recipes.list);

  const editRecipe = (recipeId) => {
    startRecipeEditing(recipeId);
  };

  const deleteRecipe = (recipe) => {
    axios
      .delete(`/v1/recipes/${recipe.id}.json`)
      .then(() => {
        deleteRecipeFromList(recipe);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <RecipeWrapper>
      {_.map(recipes, (recipe) => {
        return (
          <Recipe key={recipe.id}>
            <RecipeName>{recipe.name}</RecipeName>
            <IconContainer>
              <IconWrapper>
                <Icon
                  icon={<FiEdit />}
                  label="Edit recipe"
                  size="small"
                  handleFunc={() => editRecipe(recipe.id)}
                />
              </IconWrapper>
              <IconWrapper>
                <Icon
                  icon={<FiTrash />}
                  label="Delete recipe"
                  size="small"
                  handleFunc={() => deleteRecipe(recipe)}
                />
              </IconWrapper>
            </IconContainer>
          </Recipe>
        );
      })}
    </RecipeWrapper>
  );
};

export default RecipeList;

const RecipeWrapper = styled.div``;

const Recipe = styled(Card)`
  padding: 1.2rem 1rem;
  margin-top: 1rem;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RecipeName = styled.p``;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconWrapper = styled.div`
  margin-left: 1rem;
`;
