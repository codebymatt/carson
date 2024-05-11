import axios from "axios";
import _ from "lodash";

import store from "../store";

import recipeData from "./recipeFixture.json";
import { setSearchedRecipes } from "../state/recipeState";
// import { useSelector } from "react-redux";

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

const baseFilter = '*[_type == "recipe"]';

const generateTagFilters = (tags = []) => {
  if (tags.length === 0) {
    return baseFilter;
  }

  const tagsString = tags.map((tag) => `'${tag}' in tags[]->name`).join(" && ");

  return `*[_type == "recipe" && ${tagsString}]`;
};

const generateNameFilters = (name = "") => {
  if (name === "") {
    return baseFilter;
  }

  return `*[_type == "recipe" && name match "${name}*"]`;
};

const baseProjection = `{_id,name,servings,tags[]->{name,"color":color.hex},link,"sourceType":source->type,"sourceName":source->name,website,calories,"ingredients":ingredients[]{_id,description,"value":value,"name":ingredientName->name,"namePlural":ingredientName->plural,"unitPlural":unit->plural,"unitSingular":unit->abbreviation}}`;

export const fetchRecipes = (filterType, filter, callback) => {
  if (process.env.REACT_APP_ENVIRONMENT === "production") {
    fetchRecipesFromApi(filterType, filter, callback);
  } else {
    fetchFixtureData();
  }
};

const chooseQuery = (type = "name") => {
  if (type === "name") {
    return generateNameFilters;
  }

  return generateTagFilters;
};

const fetchRecipesFromApi = (filterType, filterTerms, callback) => {
  const paginationParam = generatePaginationParam(0, 10);

  const filterQuery = chooseQuery(filterType);

  const fullQuery =
    "?query=" + encodeURIComponent(filterQuery(filterTerms)) + paginationParam + baseProjection;

  axios.get(fullQuery).then((response) => {
    dispatch(setSearchedRecipes(response.data.result));
    if (!_.isNil(callback)) callback();
  });
};

const fetchFixtureData = () => {
  dispatch(setSearchedRecipes(recipeData.result));
};
