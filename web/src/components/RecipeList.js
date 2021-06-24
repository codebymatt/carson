import React from "react";
import styled from "styled-components";
import { TrashIcon } from "@primer/octicons-react";

import Card from "./shared/Card";
import axios from "axios";

const RecipeList = ({ recipes, deleteRecipeFromList }) => {
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
      {recipes.map((recipe) => (
        <Recipe>
          <RecipeName>{recipe.name}</RecipeName>
          <IconWrapper onClick={() => deleteRecipe(recipe)}>
            <DeleteIcon></DeleteIcon>
          </IconWrapper>
        </Recipe>
      ))}
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

const IconWrapper = styled.div``;

const DeleteIcon = styled(TrashIcon)`
  cursor: pointer;
`;
