import { createSlice } from "@reduxjs/toolkit";

export const recipeState = createSlice({
  name: "recipes",
  initialState: { list: {} },
  reducers: {
    setRecipeList: (state, action) => {
      state.list = action.payload.reduce((memo, item) => {
        return {
          ...memo,
          [item.id]: item,
        };
      }, {});
    },
  },
});

export const { setRecipeList } = recipeState.actions;

export default recipeState.reducer;
