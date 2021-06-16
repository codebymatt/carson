import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import "./App.css";
import Items from "./components/Items";

const App = () => {
  const [screen, setScreen] = useState("recipes");

  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.headers.post["Content-Type"] = "application/json";
  const Recipes = () => {};

  const LoadedComponent = screen == "recipes" ? Items : Recipes;

  return (
    <PageWrapper>
      <LoadedComponent setScreen={setScreen} />
    </PageWrapper>
  );
};

export default App;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
