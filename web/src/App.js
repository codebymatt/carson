import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItemList } from "./state/itemState";
import { setRecipeList } from "./state/recipeState";
import styled from "styled-components";
import axios from "axios";

import "./App.css";
import RecipeEditor from "./components/RecipeEditor";
import Items from "./components/Items";
import Recipes from "./components/Recipes";

import { fetchItems } from "./api/itemApi";

const App = () => {
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const dispatch = useDispatch();
  // const items = useSelector((state) => state.items.list);

  const [page, setPage] = useState("recipes");
  const [editingRecipe, setEditingRecipe] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState(null);
  // const [items, setItems] = useState([]);
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

  // const fetchItems = () => {
  //   axios
  //     .get("/v1/items.json")
  //     .then((response) => {
  //       const items = response.data.items;
  //       dispatch(setItemList(items));
  //     })
  //     .catch((error) => console.log(error));
  // };

  const fetchRecipes = () => {
    axios
      .get("/v1/recipes.json")
      .then((response) => {
        const recipes = response.data.recipes;
        dispatch(setRecipeList(recipes));
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
          currentRecipeId={currentRecipeId}
          setRecipes={setRecipes}
          addRecipeToList={addRecipeToList}
          updateRecipeInList={updateRecipeInList}
          recipeSavingEnabled={recipeSavingEnabled}
          setRecipeSavingEnabled={setRecipeSavingEnabled}
          removeIngredientFromRecipe={removeIngredientFromRecipe}
        />
      )}
      {!editingRecipe && (
        <LoadedComponent
          currentPage={page}
          togglePage={togglePage}
          startRecipeEditing={initializeRecipeEditor}
          setRecipes={setRecipes}
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
