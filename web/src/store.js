import { configureStore } from "@reduxjs/toolkit";

import itemReducer from "./state/itemState";
import recipeReducer from "./state/recipeState";

export default configureStore({
  reducer: {
    items: itemReducer,
    recipes: recipeReducer,
  },
});
