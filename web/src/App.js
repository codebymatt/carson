import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import "./App.css";
import RecipeEditorLegacy from "./components/RecipeEditorLegacy";
import RecipeEditor from "./components/recipes/RecipeEditor";
import RecipeCreator from "./components/recipes/RecipeCreator";
import Items from "./components/Items";
import Recipes from "./components/Recipes";

import { fetchItems } from "./api/itemApi";
import { fetchRecipes } from "./api/recipeApi";

const App = () => {
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const [page, setPage] = useState("recipes");
  const [editingRecipe, setEditingRecipe] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [recipeSavingEnabled, setRecipeSavingEnabled] =
    useState(false);

  const removeIngredientFromRecipe = (
    recipeId,
    deletedIngredientId,
  ) => {
    const recipeList = _.clone(recipes);

    const targetRecipe = recipeList.find((recipe) => {
      recipe.id === recipeId;
    });

    const ingredients = _.clone(targetRecipe.ingredients);
    const targetIngredient = ingredients.find((ingredient) => {
      deletedIngredientId === ingredient.id;
    });

    const index = ingredients.indexOf(targetIngredient);

    if (index > -1) {
      ingredients.splice(index, 1);
      targetRecipe.ingredients = ingredients;
      console.log(recipeList);
      setRecipes(recipeList);
    }
  };

  const initializeRecipeEditor = (recipeId) => {
    setCurrentRecipeId(recipeId);
    setEditingRecipe(true);
  };

  const cancelRecipeEditing = () => {
    setCurrentRecipeId(null);
    setEditingRecipe(false);
  };

  useEffect(() => {
    fetchItems();
    fetchRecipes();
  }, []);

  return (
    <PageWrapper>
      <Router>
        <Switch>
          <Route path="/items">
            <Items />
          </Route>
          <Route path={"/recipes/add"}>
            <RecipeCreator />
          </Route>
          <Route path={"/recipes/:id"}>
            <RecipeEditor />
          </Route>
          <Route path={["/", "/recipes"]}>
            <Recipes />
          </Route>
        </Switch>
      </Router>
    </PageWrapper>
  );
};

export default App;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
