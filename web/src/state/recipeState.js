import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export const recipeState = createSlice({
  name: "recipes",
  initialState: { list: {}, currentRecipe: null },
  reducers: {
    setRecipeList: (state, action) => {
      state.list = action.payload.reduce((memo, recipe) => {
        recipe.ingredients = mapIngredientsToId(recipe.ingredients);

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
    addIngredientToRecipe: (state, action) => {
      const { recipeId, ingredient } = action.payload;
      const recipe = state.list[recipeId];
      state.list[recipeId] = {
        ...recipe,
        ingredients: {
          ...recipe.ingredients,
          [ingredient.id]: ingredient,
        },
      };
    },
    removeIngredientFromRecipe: (state, action) => {
      const { recipeId, ingredientId } = action.payload;
      const recipe = state.list[recipeId];

      const updatedIngredients = _.omit(
        recipe.ingredients,
        ingredientId,
      );

      state.list[recipeId].ingredients = updatedIngredients;
    },
    updateIngredientInRecipe: (state, action) => {
      const { recipeId, ingredient } = action.payload;
      const recipe = state.list[recipeId];

      const updatedIngredients = {
        ...recipe.ingredients,
        [ingredient.id]: ingredient,
      };

      state.list[recipe.id].ingredients = updatedIngredients;
    },
  },
});

export const {
  setRecipeList,
  addRecipeToList,
  deleteRecipeFromList,
  updateRecipeInList,
  setCurrentRecipe,
  addIngredientToRecipe,
  removeIngredientFromRecipe,
  updateIngredientInRecipe,
} = recipeState.actions;

export default recipeState.reducer;

const mapIngredientsToId = (ingredients) => {
  return ingredients.reduce((memo, ingredient) => {
    return {
      ...memo,
      [ingredient.id]: ingredient,
    };
  }, {});
};
