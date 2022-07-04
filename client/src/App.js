import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import _ from "lodash";
import { useSelector } from "react-redux";

import { setShoppingList } from "./state/shoppingListState";
import store from "./store";

import {
  Box,
  Button,
  Card,
  Flex,
  studioTheme,
  Tab,
  TabList,
  TabPanel,
  ThemeProvider,
} from "@sanity/ui";
import Recipe from "./components/recipe";

import { fetchRecipes } from "./api/recipeApi";
import ShoppingList from "./components/shoppingList";
import { scaledValue } from "./utils/ingredientDescription";

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_SANITY_BASE_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const [tabId, setTabId] = useState("recipes");
  const [hideChecked, setHideChecked] = useState(false);

  const recipes = useSelector((state) => state.recipes.list);
  const shoppingList = useSelector((state) => state.shoppingList.list);
  const [shoppingListPresent, setShoppingListPresent] = useState(false);

  const clearList = () => store.dispatch(setShoppingList({}));

  const generateShoppingList = () => {
    const ingredientList = _.reduce(
      recipes,
      (memo, recipe, _recipeId) => {
        if (recipe.selected) {
          recipe.ingredients.forEach((ingredient) => {
            const ingredientValue = scaledValue(
              ingredient.value,
              recipe.servings,
              recipe.updatedServings,
            );
            const key = `${ingredient.name}-${ingredient.unitSingular}`;
            memo[key]
              ? (memo[key].value += ingredientValue)
              : (memo[key] = { ...ingredient, value: ingredientValue });
          });
        }

        return memo;
      },
      {},
    );

    store.dispatch(setShoppingList(ingredientList));
    setTabId("shoppingList");
  };

  useEffect(() => {
    const listPresent = _.isNil(shoppingList) ? false : Object.keys(shoppingList).length > 0;
    setShoppingListPresent(listPresent);
  }, [shoppingList]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <ThemeProvider theme={studioTheme}>
      <PageWrapper>
        <Box marginTop={4}>
          <Flex justify={"space-between"} align="center" style={{ minHeight: "2.5rem" }}>
            <TabToggle tabId={tabId} setTabId={setTabId} />
            {tabId === "recipes" && (
              <Button
                disabled={shoppingListPresent}
                tone="positive"
                text="Generate List"
                onClick={() => generateShoppingList()}
              />
            )}
            {tabId !== "recipes" && (
              <Flex>
                <Button
                  style={{
                    cursor: "pointer",
                    display: shoppingListPresent ? "block" : "none",
                  }}
                  mode={hideChecked ? "default" : "bleed"}
                  tone="positive"
                  text={`${hideChecked ? "Show" : "Hide"} checked items`}
                  onClick={() => setHideChecked(!hideChecked)}
                />
                <Button
                  style={{
                    cursor: "pointer",
                    marginLeft: "1rem",
                    display: shoppingListPresent ? "block" : "none",
                  }}
                  mode="bleed"
                  tone="critical"
                  text={"Clear list"}
                  onClick={clearList}
                />
              </Flex>
            )}
          </Flex>
          <Card shadow={1} padding={4} radius={2} marginTop={4}>
            <RecipeTab tabId={tabId} />
            <ShoppingListTab tabId={tabId} hideChecked={hideChecked} />
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
  const switchToShoppingList = () => {
    setTabId("shoppingList");
  };

  return (
    <TabList space={2}>
      <Tab label="Recipes" onClick={() => setTabId("recipes")} selected={tabId === "recipes"} />
      <Tab
        label="Shopping List"
        onClick={switchToShoppingList}
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

const ShoppingListTab = ({ tabId, hideChecked }) => {
  return (
    <TabPanel hidden={tabId !== "shoppingList"}>
      <ShoppingList hideChecked={hideChecked} />
    </TabPanel>
  );
};
