import axios from "axios";
import _ from "lodash";
import {
  addIngredientToRecipe,
  removeIngredientFromRecipe,
  updateIngredientInRecipe,
} from "../state/recipeState";

import store from "../store";
import { handleResourceErrors, notifySuccess } from "./shared";

const dispatch = (payload) => {
  store.dispatch(payload);
};

export const addIngredient = (recipeId, ingredient, callback) => {
  axios
    .post(`/v1/recipes/${recipeId}/recipe_items.json`, {
      recipe_item: ingredient,
    })
    .then((response) => {
      dispatch(
        addIngredientToRecipe({
          recipeId: recipeId,
          ingredient: response.data.recipe_item,
        }),
      );
      notifySuccess("Ingredient successfully added!");
      if (!_.isNil(callback)) callback();
    })
    .catch(handleResourceErrors);
};

export const deleteIngredient = (
  recipeId,
  ingredientId,
  callback,
) => {
  axios
    .delete(
      `/v1/recipes/${recipeId}/recipe_items/${ingredientId}.json`,
    )
    .then(() => {
      dispatch(
        removeIngredientFromRecipe({
          recipeId: recipeId,
          ingredientId: ingredientId,
        }),
      );
      if (!_.isNil(callback)) callback();
    })
    .catch(handleResourceErrors);
};

export const updateIngredient = (recipeId, ingredient, callback) => {
  axios
    .put(
      `/v1/recipes/${recipeId}/recipe_items/${ingredient.id}.json`,
      { recipe_item: ingredient },
    )
    .then((response) => {
      dispatch(
        updateIngredientInRecipe({
          recipeId: recipeId,
          ingredient: response.data.recipe_item,
        }),
      );

      if (!_.isNil(callback)) callback();
    })
    .catch(handleResourceErrors);
};
