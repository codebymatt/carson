import axios from "axios";
import _ from "lodash";

import store from "../store";

import recipeData from "./recipeFixture.json";
import { setRecipeList } from "../state/recipeState";
import { useSelector } from "react-redux";

const dispatch = (payload) => {
  store.dispatch(payload);
};

const DEFAULT_LIMIT = 10;

// We decrement the last array index in all cases since GROQ slicing is 0 indexed.
const generatePaginationParam = (offset = 0, limit = DEFAULT_LIMIT) => {
  if (limit <= 0) {
    if (offset <= 0) {
      return "";
    }

    return `[${offset}..${offset + DEFAULT_LIMIT - 1}]`;
  }

  if (offset <= 0) {
    return `[0..${limit - 1}]`;
  }

  return `[${offset}..${offset + limit - 1}]`;
};

const generateFilters = (name = "") => {
  if (name === "") {
    return '*[_type == "recipe"]';
  }

  return `*[_type == "recipe" && name match "${name}*"]`;
};

const baseProjection = `{_id,name,servings,tags[]->{name,"color":color.hex},link,"sourceType":source->type,"sourceName":source->name,website,calories,"ingredients":ingredients[]{_id,description,"value":value,"name":ingredientName->name,"namePlural":ingredientName->plural,"unitPlural":unit->plural,"unitSingular":unit->abbreviation}}`;

export const fetchRecipes = (nameFilterTerm, callback) => {
  if (process.env.REACT_APP_ENVIRONMENT === "production") {
    fetchRecipesFromApi(nameFilterTerm, callback);
  } else {
    fetchFixtureData();
  }
};

const fetchRecipesFromApi = (nameFilterTerm, callback) => {
  const paginationParam = generatePaginationParam(0, 3);
  const query =
    "?query=" +
    encodeURIComponent(generateFilters(nameFilterTerm)) +
    paginationParam +
    baseProjection;

  axios.get(query).then((response) => {
    dispatch(setRecipeList(response.data.result));
    if (!_.isNil(callback)) callback();
  });
};

const fetchFixtureData = () => {
  dispatch(setRecipeList(recipeData.result));
};
