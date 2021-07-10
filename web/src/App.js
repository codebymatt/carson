import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import _ from "lodash";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// import { ToastProvider, useToasts } from "react-toast-notifications";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import RecipeEditor from "./components/recipes/RecipeEditor";
import RecipeCreator from "./components/recipes/RecipeCreator";
import Items from "./components/items/Items";
import Recipes from "./components/recipes/Recipes";

import { fetchItems } from "./api/itemApi";
import { fetchRecipes } from "./api/recipeApi";

const App = () => {
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.headers.post["Content-Type"] = "application/json";

  // axios.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (!_.isNil(error.response.data.errors)) {
  //       error.response.data.errors.forEach((message) => {
  //         toast.error(message);
  //       });
  //     }

  //     if (!_.is_nil(error.response.data.error)) {
  //       toast.error(error.response.data.error);
  //     }

  //     return Promise.reject(error);
  //   },
  // );

  useEffect(() => {
    fetchItems();
    fetchRecipes();
  }, []);

  return (
    <PageWrapper>
      <Router>
        <Switch>
          <Route path="/items">
            <Items />
          </Route>
          <Route path={"/recipes/add"}>
            <RecipeCreator />
          </Route>
          <Route path={"/recipes/:id"}>
            <RecipeEditor />
          </Route>
          <Route path={["/", "/recipes"]}>
            <Recipes />
          </Route>
        </Switch>
      </Router>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </PageWrapper>
  );
};

export default App;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
