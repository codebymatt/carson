import React from "react";

import { InnerPageWrapper } from "../shared/Wrappers";

import ShoppingListHeader from "./ShoppingListHeader";
// import RecipeList from "./RecipeList";

import { useHistory, withRouter } from "react-router-dom";

const ShoppingList = () => {
  const history = useHistory();

  const addRecipe = () => {
    history.push("/recipes/add");
  };
  return (
    <InnerPageWrapper>
      <ShoppingListHeader title="Shopping List" />
      {/* <NavHeader
        currentPage="shoppingList"
        // addFunction={addRecipe}
        title="Shopping List"
      /> */}
      {/* <RecipeList /> */}
    </InnerPageWrapper>
  );
};

export default withRouter(ShoppingList);
