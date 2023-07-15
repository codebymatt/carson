import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export const recipeState = createSlice({
  name: "recipes",
  initialState: { list: {}, selectedRecipes: {}, searchedRecipes: {} },
  reducers: {
    setRecipeList: (state, action) => {
      state.list = action.payload.reduce((memo, recipe) => {
        const recipeId = recipe._id;
        return {
          ...memo,
          [recipeId]: {
            ...recipe,
            id: recipeId,
            selected: false,
            servingsAvailable: recipe.servings,
          },
        };
      }, {});
    },
    setSearchedRecipes: (state, action) => {
      const cleanedRecipes = {};
      action.payload.forEach((recipe) => {
        const updatedRecipe = { ...recipe, id: recipe._id, selected: false };
        // if (
        //   state.selectedRecipes[recipe._id] !== null &&
        //   state.selectedRecipes[recipe._id] !== undefined
        // ) {
        //   updatedRecipe.selected = true;
        //   // updatedRecipe.servings = state.selectedRecipes[recipe._id].servings;
        // }
        cleanedRecipes[updatedRecipe.id] = updatedRecipe;
      });

      console.log(cleanedRecipes);

      state.searchedRecipes = cleanedRecipes;
    },
    updateRecipeInList: (state, action) => {
      state.list = {
        ...state.list,
        ...{ [action.payload.id]: action.payload },
      };
    },
    addSelectedRecipe: (state, action) => {
      const servings = action.payload.servings;
      const recipe = {
        ...action.payload,
        selected: true,
        servingsSelected: servings,
        servingsRemaining: servings,
      };
      if (!state.selectedRecipes.hasOwnProperty([recipe._id])) {
        state.selectedRecipes = {
          ...state.selectedRecipes,
          [recipe.id]: recipe,
        };
      }
    },
    removeSelectedRecipe: (state, action) => {
      const updatedRecipes = state.selectedRecipes;
      delete updatedRecipes[action.payload];
      state.selectedRecipes = updatedRecipes;
    },
    updateServingsSelected: (state, action) => {
      const { recipeId, delta } = action;
      const recipes = state.selectedRecipes;
      if (!_.isNull(recipes[recipeId])) {
        recipes[recipeId].servingsSelected += delta;
      }

      state.selectedRecipes = recipes;
    },
    updateServingsRemaining: (state, action) => {
      const { recipeId, delta } = action;
      const recipes = state.selectedRecipes;
      if (!_.isNull(recipes[recipeId])) {
        recipes[recipeId].servingsRemaining += delta;
      }

      state.selectedRecipes = recipes;
    },
  },
});

// FUTURE MATT! Allow adjusting servings selected in serving adjustor!

export const {
  setRecipeList,
  setSearchedRecipes,
  updateRecipeInList,
  addSelectedRecipe,
  removeSelectedRecipe,
  updateServingsRemaining,
  updateServingsSelected,
} = recipeState.actions;

export default recipeState.reducer;
