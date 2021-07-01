import axios from "axios";
import _ from "lodash";
import {
  setRecipeList,
  addRecipeToList,
  deleteRecipeFromList,
  updateRecipeInList,
} from "../state/recipeState";

import store from "../store";

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
    .catch((error) => console.log(error));
};

export const createRecipe = (recipe, callback) => {
  axios
    .post("/v1/recipes.json", { recipe: recipe })
    .then((response) => {
      dispatch(addRecipeToList(response.data.recipe));
      if (!_.isNil(callback)) callback();
    })
    .catch((error) => console.log(error));
};

export const deleteRecipe = (recipeId, callback) => {
  axios
    .delete(`/v1/recipes/${recipeId}.json`)
    .then(() => {
      dispatch(deleteRecipeFromList(recipeId));
      if (!_.isNil(callback)) callback();
    })
    .catch((error) => console.log(error));
};

export const updateRecipe = (recipeId, callback) => {
  axios
    .put(`/v1/recipes/${recipeId}.json`)
    .then((response) => {
      dispatch(updateRecipeInList(response.data.recipe));
      if (!_.isNil(callback)) callback();
    })
    .catch((error) => console.log(error));
};
