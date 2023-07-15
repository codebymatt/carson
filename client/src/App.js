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
import { scaledValue } from "./utils/ingredientDescription";
import FilterInput from "./components/filter";
import { setAvailableTags } from "./state/filterState";
import Planner from "./components/planner";

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_SANITY_BASE_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const [tabId, setTabId] = useState("searchRecipes");
  const [hideChecked, setHideChecked] = useState(false);

  // const recipes = useSelector((state) => state.recipes.list);
  const selectedRecipes = useSelector((state) => state.recipes.selectedRecipes);
  const nameFilterTerm = useSelector((state) => state.filters.name);
  const tagFilters = useSelector((state) => state.filters.tags);
  const shoppingList = useSelector((state) => state.shoppingList.list);
  const [shoppingListPresent, setShoppingListPresent] = useState(false);

  const clearList = () => store.dispatch(setShoppingList({}));

  const generateShoppingList = () => {
    const ingredientList = _.reduce(
      selectedRecipes,
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
    var tags = [];
    if (tagFilters !== undefined) {
      tags = tagFilters;
    }

    fetchRecipes("tags", tags);
  }, [tagFilters]);

  useEffect(() => {
    var name = "";
    if (nameFilterTerm !== undefined) {
      name = nameFilterTerm;
    }
    fetchRecipes("name", name);
  }, [nameFilterTerm]);

  useEffect(() => {
    axios
      .get('?query=array::unique(*[_type == "tag"])[]{"id": name, "text": name}')
      .then((response) => {
        store.dispatch(setAvailableTags(response.data.result));
      });
  }, []);

  return (
    <ThemeProvider theme={studioTheme}>
      <PageWrapper>
        <Box marginTop={4}>
          <Flex justify={"space-between"} align="center" style={{ minHeight: "2.5rem" }}>
            <TabPicker tabId={tabId} setTabId={setTabId} />
            {tabId === "searchRecipes" && (
              <Button
                disabled={shoppingListPresent}
                tone="positive"
                text="Generate List"
                onClick={() => generateShoppingList()}
              />
            )}
            {tabId === "shoppingList" && (
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
          <Card
            shadow={tabId === "shoppingList" ? 1 : 0}
            padding={tabId === "shoppingList" ? 4 : 0}
            radius={2}
            marginTop={4}
          >
            <SearchRecipesTab tabId={tabId} />
            <SelectedRecipesTab tabId={tabId} />
            <ShoppingListTab tabId={tabId} hideChecked={hideChecked} />
            <WeeklyPlannerTab tabId={tabId} />
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

const TabPicker = ({ tabId, setTabId }) => {
  return (
    <TabList space={2}>
      <Tab
        label="Search Recipes"
        onClick={() => setTabId("searchRecipes")}
        selected={tabId === "searchRecipes"}
      />
      <Tab
        label="Selected Recipes"
        onClick={() => setTabId("selectedRecipes")}
        selected={tabId === "selectedRecipes"}
      />
      <Tab
        label="Weekly Planner"
        onClick={() => setTabId("weeklyPlanner")}
        selected={tabId === "weeklyPlanner"}
      />
      <Tab
        label="Shopping List"
        onClick={() => setTabId("shoppingList")}
        selected={tabId === "shoppingList"}
      />
    </TabList>
  );
};

const SearchRecipesTab = ({ tabId }) => {
  const [recipes, setRecipes] = useState([]);
  const storedSearchedRecipes = useSelector((state) => state.recipes.searchedRecipes);
  const storedSelectedRecipes = useSelector((state) => state.recipes.selectedRecipes);

  useEffect(() => {
    const searchedRecipes = _.values(storedSearchedRecipes);
    const joinedRecipes = [];

    searchedRecipes.forEach((recipe) => {
      if (
        storedSelectedRecipes[recipe.id] === null ||
        storedSelectedRecipes[recipe.id] === undefined
      ) {
        joinedRecipes.push(recipe);
      }
    });

    setRecipes(joinedRecipes);
  }, [storedSelectedRecipes, storedSearchedRecipes]);
  return (
    <TabPanel hidden={tabId !== "searchRecipes"}>
      <FilterInput type="text" />
      <Box>
        {_.map(recipes, (recipe, index) => {
          return <Recipe key={index} recipe={recipe} selected={false} />;
        })}
      </Box>
    </TabPanel>
  );
};

const SelectedRecipesTab = ({ tabId }) => {
  const recipes = useSelector((state) => state.recipes.selectedRecipes);

  if (Object.keys(recipes).length === 0) {
    return (
      <TabPanel hidden={tabId !== "selectedRecipes"}>
        <Heading>Select some recipes for your meal plan, then come back here!</Heading>
      </TabPanel>
    );
  }

  return (
    <TabPanel hidden={tabId !== "selectedRecipes"}>
      <Box>
        {_.map(_.values(recipes), (recipe, index) => {
          return <Recipe key={index} recipe={recipe} selected={true} />;
        })}
      </Box>
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

const WeeklyPlannerTab = ({ tabId }) => {
  return (
    <TabPanel hidden={tabId !== "weeklyPlanner"}>
      <Planner />
    </TabPanel>
  );
};
