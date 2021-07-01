import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export const recipeState = createSlice({
  name: "recipes",
  initialState: { list: {}, currentRecipe: null },
  reducers: {
    setRecipeList: (state, action) => {
      state.list = action.payload.reduce((memo, recipe) => {
        return {
          ...memo,
          [recipe.id]: recipe,
        };
      }, {});
    },
    addRecipeToList: (state, action) => {
      state.list = {
        ...state.list,
        ...{ [action.payload.id]: action.payload },
      };
    },
    deleteRecipeFromList: (state, action) => {
      state.list = _.omit(state.list, action.payload);
    },
    updateRecipeInList: (state, action) => {
      state.list = {
        ...state.list,
        ...{ [action.payload.id]: action.payload },
      };
    },
    setCurrentRecipe: (state, action) => {
      const recipeId = action.payload;
      const recipe = _.isNil(recipeId) ? null : state.list.recipeId;

      state.currentRecipe = recipe;
    },
  },
});

export const {
  setRecipeList,
  addRecipeToList,
  deleteRecipeFromList,
  updateRecipeInList,
  setCurrentRecipe,
} = recipeState.actions;

export default recipeState.reducer;
