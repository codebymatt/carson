import { configureStore } from "@reduxjs/toolkit";

import recipeReducer from "./state/recipeState";
import shoppingListReducer from "./state/shoppingListState";

export default configureStore({
  reducer: { recipes: recipeReducer, shoppingList: shoppingListReducer },
});
