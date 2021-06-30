import React, { useState, useEffect } from "react";
import axios from "axios";

import { InnerPageWrapper } from "./shared/Wrappers";

import Header from "./Header";
import RecipeList from "./RecipeList";
import { useSelector } from "react-redux";

const Recipes = ({
  setRecipes,
  togglePage,
  currentPage,
  startRecipeEditing,
}) => {
  const recipes = useSelector((state) => state.recipes.list);
  const deleteRecipeFromList = (recipe) => {
    const updatedRecipes = recipes.slice();
    const index = updatedRecipes.indexOf(recipe);
    if (index > -1) {
      updatedRecipes.splice(index, 1);
      setRecipes(updatedRecipes);
    }
  };

  // useEffect(() => {
  //   axios
  //     .get("/v1/recipes.json")
  //     .then((response) => {
  //       setRecipes(response.data.recipes);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <InnerPageWrapper>
      <Header
        currentPage={currentPage}
        togglePage={togglePage}
        addFunction={() => startRecipeEditing(null)}
      ></Header>
      <RecipeList
        // recipes={recipes}
        startRecipeEditing={startRecipeEditing}
        deleteRecipeFromList={deleteRecipeFromList}
      />
    </InnerPageWrapper>
  );
};

export default Recipes;
