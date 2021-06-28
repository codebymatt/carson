import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import "./App.css";
import RecipeEditor from "./components/RecipeEditor";
import Items from "./components/Items";
import Recipes from "./components/Recipes";

const App = () => {
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const [page, setPage] = useState("recipes");
  const [editingRecipe, setEditingRecipe] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState(null);
  const [items, setItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipeSavingEnabled, setRecipeSavingEnabled] =
    useState(false);

  const addRecipeToList = (recipe) => {
    setCurrentRecipeId(recipe.id);
    setRecipes([recipe, ...recipes]);
  };

  const updateRecipeInList = (updatedRecipeData) => {
    const recipeList = recipes;
    const updatedRecipe = recipeList.find((recipe) => {
      recipe.id === updatedRecipeData.id;
    });

    const index = recipeList.indexOf(updatedRecipe);
    recipeList[index] = updatedRecipeData;
    setRecipes(recipeList);
  };

  const LoadedComponent = page === "recipes" ? Recipes : Items;
  const togglePage = () => {
    const newPage = page === "recipes" ? "items" : "recipes";
    setPage(newPage);
  };

  const initializeRecipeEditor = (recipeId) => {
    setCurrentRecipeId(recipeId);
    setEditingRecipe(true);
  };

  const cancelRecipeEditing = () => {
    setCurrentRecipeId(null);
    setEditingRecipe(false);
  };

  const fetchItems = () => {
    axios
      .get("/v1/items.json")
      .then((response) => {
        setItems(response.data.items);
      })
      .catch((error) => console.log(error));
  };

  const fetchRecipes = () => {
    axios
      .get("/v1/recipes.json")
      .then((response) => {
        setRecipes(response.data.recipes);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchItems();
    fetchRecipes();
  }, []);

  return (
    <PageWrapper>
      {editingRecipe && (
        <RecipeEditor
          cancelRecipeAddition={cancelRecipeEditing}
          items={items}
          recipes={recipes}
          currentRecipeId={currentRecipeId}
          setRecipes={setRecipes}
          addRecipeToList={addRecipeToList}
          updateRecipeInList={updateRecipeInList}
          recipeSavingEnabled={recipeSavingEnabled}
          setRecipeSavingEnabled={setRecipeSavingEnabled}
        />
      )}
      {!editingRecipe && (
        <LoadedComponent
          currentPage={page}
          togglePage={togglePage}
          startRecipeEditing={initializeRecipeEditor}
          recipes={recipes}
          setRecipes={setRecipes}
          items={items}
          setItems={setItems}
        />
      )}
    </PageWrapper>
  );
};

export default App;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
