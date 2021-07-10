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

import { ToastContainer } from "react-toastify";

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

  useEffect(() => {
    fetchItems();
    fetchRecipes();
  }, []);

  return (
    <PageWrapper>
      {/* <ToastProvider> */}
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
      <ToastContainer />
      {/* </ToastProvider> */}
    </PageWrapper>
  );
};

export default App;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
