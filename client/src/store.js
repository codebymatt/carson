import { configureStore } from "@reduxjs/toolkit";

import recipeReducer from "./state/recipeState";

export default configureStore({
  reducer: { recipes: recipeReducer },
});
