import React from "react";
import styled from "styled-components";

import { InnerPageWrapper } from "./shared/Wrappers";

import NavHeader from "./NavHeader";
import RecipeList from "./RecipeList";

import { FiPlus, FiBookOpen, FiList } from "react-icons/fi";

import Icon from "./shared/Icon";
import { useHistory, withRouter } from "react-router-dom";

const Recipes = () => {
  // const [addingRecipe]
  const history = useHistory();

  const addRecipe = () => {
    history.push("/recipes/add");
  };
  return (
    <InnerPageWrapper>
      <NavHeader currentPage="recipe" addFunction={addRecipe} />
      <RecipeList />
    </InnerPageWrapper>
  );
};

export default withRouter(Recipes);

const IconWrapper = styled.div`
  margin-left: 1rem;
`;
