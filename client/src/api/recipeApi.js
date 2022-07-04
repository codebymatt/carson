import axios from "axios";
import _ from "lodash";

import recipeData from "./recipeFixture.json";

import { setRecipeList } from "../state/recipeState";

import store from "../store";

const dispatch = (payload) => {
  store.dispatch(payload);
};

const productionQuery = `?query=*[_type == 'recipe']{_id,name,link,servings,"sourceType":source->type, "sourceName":source->name, website,calories,"ingredients":ingredients[]{_id,description, "value":value, "name":ingredientName->name, "namePlural": ingredientName->plural,"unitPlural": unit->plural,"unitSingular": unit->abbreviation}}`;

export const fetchRecipes = (callback) => {
  console.log(process.env.REACT_APP_ENVIRONMENT);
  if (process.env.REACT_APP_ENVIRONMENT === "production") {
    fetchRecipesFromApi(callback);
  } else {
    fetchFixtureData();
  }
};

const fetchRecipesFromApi = (callback) => {
  axios.get(productionQuery).then((response) => {
    console.log(response.data);
    dispatch(setRecipeList(response.data.result));
    if (!_.isNil(callback)) callback();
  });
  console.log(recipeData.result);
};

const fetchFixtureData = () => {
  dispatch(setRecipeList(recipeData.result));
};
