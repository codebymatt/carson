import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export const recipeState = createSlice({
  name: "recipes",
  initialState: { list: {} },
  reducers: {
    setRecipeList: (state, action) => {
      state.list = action.payload.reduce((memo, recipe) => {
        const recipeId = recipe._id;
        return {
          ...memo,
          [recipeId]: { ...recipe, id: recipeId, selected: false },
        };
      }, {});
    },
    updateRecipeInList: (state, action) => {
      state.list = {
        ...state.list,
        ...{ [action.payload.id]: action.payload },
      };
    },
  },
});

export const { setRecipeList, updateRecipeInList } = recipeState.actions;

export default recipeState.reducer;
