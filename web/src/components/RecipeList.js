import React from "react";
import styled from "styled-components";

import { FiEdit, FiTrash } from "react-icons/fi";

import Card from "./shared/Card";
import Icon from "./shared/Icon";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../api/recipeApi";
import { useHistory, withRouter } from "react-router-dom";

const RecipeList = ({ startRecipeEditing }) => {
  const history = useHistory();
  const recipes = useSelector((state) => state.recipes.list);
  const editRecipe = (recipeId) => startRecipeEditing(recipeId);

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
                  handleFunc={() =>
                    history.push(`/recipes/${recipe.id}`)
                  }
                />
              </IconWrapper>
              <IconWrapper>
                <Icon
                  icon={<FiTrash />}
                  label="Delete recipe"
                  size="small"
                  handleFunc={() => deleteRecipe(recipe.id)}
                />
              </IconWrapper>
            </IconContainer>
          </Recipe>
        );
      })}
    </RecipeWrapper>
  );
};

export default withRouter(RecipeList);

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
