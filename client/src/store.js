import { configureStore } from "@reduxjs/toolkit";

import recipeReducer from "./state/recipeState";
import shoppingListReducer from "./state/shoppingListState";
import filtersReducer from "./state/filterState";

export default configureStore({
  reducer: { recipes: recipeReducer, shoppingList: shoppingListReducer, filters: filtersReducer },
});
