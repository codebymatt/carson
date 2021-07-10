import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { InnerPageWrapper } from "../shared/Wrappers";
import { ActionButton } from "../shared/Buttons";
import Header from "./Header";
import RecipeInputs from "./RecipeInputs";
import IngredientCreator from "../ingredients/IngredientCreator";
import Ingredient from "../ingredients/Ingredient";

const RecipeEditor = () => {
  // TODO: Eventually add support for recipe deep linking.
  const { id } = useParams();
  const recipes = useSelector((state) => state.recipes.list);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [recipe, setRecipe] = useState({});

  const [savingEnabled, setSavingEnabled] = useState(false);
  const [addingIngredient, setAddingIngredient] = useState(false);

  useEffect(() => {
    const inputsChanged = name != recipe.name || link != recipe.link;
    setSavingEnabled(inputsChanged);
  }, [name, link]);

  useEffect(() => {
    if (!_.isNil(recipes[id])) {
      const currentRecipe = recipes[id];
      setRecipe(recipes[id]);
      setName(currentRecipe.name);
      setLink(currentRecipe.link);
    }
  }, [recipes]);

  return (
    <InnerPageWrapper>
      <Header savingEnabled={savingEnabled} />
      <RecipeInputs
        name={name}
        setName={setName}
        link={link}
        setLink={setLink}
      />
      {!addingIngredient && (
        <ButtonWrapper>
          <ActionButton
            text="Add Ingredient"
            onClick={() => setAddingIngredient(true)}
          />
        </ButtonWrapper>
      )}
      {addingIngredient && (
        <IngredientCreator
          recipeId={id}
          closeFunc={() => setAddingIngredient(false)}
        />
      )}
      {_.map(recipe.ingredients, (ingredient) => {
        return <Ingredient ingredient={ingredient} />;
      })}
    </InnerPageWrapper>
  );
};

export default RecipeEditor;

const ButtonWrapper = styled.div`
  margin: 2rem auto;
`;
