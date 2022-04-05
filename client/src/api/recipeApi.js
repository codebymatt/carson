import axios from "axios";
import _ from "lodash";

import recipeData from "./recipeFixture.json";

import { setRecipeList } from "../state/recipeState";

import store from "../store";

const dispatch = (payload) => {
  store.dispatch(payload);
};

export const fetchRecipes = (callback) => {
  // axios.get("?query=*[_type == 'recipe]").then((response) => {
  //   console.log(response.data);
  //   dispatch(setRecipeList(response.data.result));
  //   if (!_.isNil(callback)) callback();
  // });
  // fetch("./recipeFixture.json", {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  // }).then((response) => {
  //   console.log(response);
  // });
  // console.log(recipeData.result);
  dispatch(setRecipeList(recipeData.result));
};
