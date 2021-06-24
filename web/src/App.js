import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import "./App.css";
import Items from "./components/Items";
import Recipes from "./components/Recipes";

const App = () => {
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const [page, setPage] = useState("items");

  const LoadedComponent = page == "recipes" ? Recipes : Items;
  const togglePage = () => {
    const newPage = page == "recipes" ? "items" : "recipes";
    setPage(newPage);
  };

  return (
    <PageWrapper>
      <LoadedComponent currentPage={page} togglePage={togglePage} />
    </PageWrapper>
  );
};

export default App;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
