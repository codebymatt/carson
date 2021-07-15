import axios from "axios";
import _ from "lodash";
import {
  setRecipeList,
  addRecipeToList,
  deleteRecipeFromList,
  updateRecipeInList,
} from "../state/recipeState";

import store from "../store";
import { handleResourceErrors, notifySuccess } from "./shared";

const dispatch = (payload) => {
  store.dispatch(payload);
};

export const fetchRecipes = (callback) => {
  axios
    .get("/v1/recipes.json")
    .then((response) => {
      dispatch(setRecipeList(response.data.recipes));
      if (!_.isNil(callback)) callback();
    })
    .catch(handleResourceErrors);
};

export const createRecipe = (recipe, callback) => {
  axios
    .post("/v1/recipes.json", { recipe: recipe })
    .then((response) => {
      dispatch(addRecipeToList(response.data.recipe));
      notifySuccess("Recipe successfully added!");
      if (!_.isNil(callback)) callback(response.data.recipe.id);
    })
    .catch(handleResourceErrors);
};

export const deleteRecipe = (recipeId, callback) => {
  axios
    .delete(`/v1/recipes/${recipeId}.json`)
    .then(() => {
      dispatch(deleteRecipeFromList(recipeId));
      notifySuccess("Recipe successfully deleted!");
      if (!_.isNil(callback)) callback();
    })
    .catch(handleResourceErrors);
};

export const updateRecipe = (recipe, callback) => {
  axios
    .put(`/v1/recipes/${recipe.id}.json`, { recipe: recipe })
    .then((response) => {
      dispatch(updateRecipeInList(response.data.recipe));
      notifySuccess("Recipe successfully saved!");
      if (!_.isNil(callback)) callback();
    })
    .catch(handleResourceErrors);
};
