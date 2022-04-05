import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import _ from "lodash";
import { useSelector } from "react-redux";

import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  studioTheme,
  Tab,
  TabList,
  TabPanel,
  ThemeProvider,
} from "@sanity/ui";
import Recipe from "./components/recipe";

import { fetchRecipes } from "./api/recipeApi";
import ShoppingList from "./components/shoppingList";

function App() {
  axios.defaults.baseURL = "https://zluobgom.api.sanity.io/v2022-04-01/data/query/production";
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const [tabId, setTabId] = useState("recipes");

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <ThemeProvider theme={studioTheme}>
      <PageWrapper>
        <Box marginTop={4}>
          <Flex justify={"space-between"} align="center" style={{ minHeight: "2.5rem" }}>
            <TabToggle tabId={tabId} setTabId={setTabId} />
            {tabId === "recipes" && <Button tone="positive" text="Generate List" />}
          </Flex>
          <Card shadow={1} padding={4} radius={2} marginTop={4}>
            <RecipeTab tabId={tabId} />
            <ShoppingListTab tabId={tabId} />
          </Card>
        </Box>
      </PageWrapper>
    </ThemeProvider>
  );
}

export default App;

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const TabToggle = ({ tabId, setTabId }) => {
  return (
    <TabList space={2}>
      <Tab label="Recipes" onClick={() => setTabId("recipes")} selected={tabId === "recipes"} />
      <Tab
        label="Shopping List"
        onClick={() => setTabId("shoppingList")}
        selected={tabId === "shoppingList"}
      />
    </TabList>
  );
};

const RecipeTab = ({ tabId }) => {
  const recipes = useSelector((state) => state.recipes.list);
  return (
    <TabPanel hidden={tabId !== "recipes"}>
      {_.map(recipes, (recipe) => {
        return <Recipe recipe={recipe} />;
      })}
    </TabPanel>
  );
};

const ShoppingListTab = ({ tabId }) => {
  return (
    <TabPanel hidden={tabId !== "shoppingList"}>
      <ShoppingList />
    </TabPanel>
  );
};
