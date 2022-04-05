import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export const shoppingListState = createSlice({
  name: "shoppingList",
  initialState: { ingredients: {} },
  reducers: {
    setShoppingList: (state, action) => {
      state.list = action.payload;
    },
    updateIngredientInList: (state, action) => {
      state.list = {
        ...state.list,
        ...{ [action.payload.id]: action.payload },
      };
    },
  },
});

export const { setShoppingList, updateIngredientInList } = shoppingListState.actions;

export default shoppingListState.reducer;
