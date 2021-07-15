import React from "react";

import { InnerPageWrapper } from "../shared/Wrappers";

import NavHeader from "../NavHeader";
import RecipeList from "./RecipeList";

import { useHistory, withRouter } from "react-router-dom";

const Recipes = () => {
  const history = useHistory();

  const addRecipe = () => {
    history.push("/recipes/add");
  };
  return (
    <InnerPageWrapper>
      <NavHeader
        currentPage="recipe"
        addFunction={addRecipe}
        title="Recipes"
      />
      <RecipeList />
    </InnerPageWrapper>
  );
};

export default withRouter(Recipes);
