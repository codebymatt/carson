import React, { useState } from "react";
import styled from "styled-components";

import { FiEdit } from "react-icons/fi";

import AddIngredient from "./AddIngredient";
import Icon from "./shared/Icon";
import Card from "./shared/Card";

const Ingredient = ({ ingredient, recipeId }) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      {!editing && (
        <IngredientDisplayer>
          <IngredientName>
            {ingredient.full_description}
          </IngredientName>
          <Icon
            icon={<FiEdit />}
            label="Edit ingredient"
            size="small"
            handleFunc={() => setEditing(true)}
          />
        </IngredientDisplayer>
      )}
      {editing && (
        <AddIngredient
          recipeId={recipeId}
          ingredient={ingredient}
          closeFunc={() => setEditing(false)}
        />
      )}
    </>
  );
};

export default Ingredient;

const IngredientDisplayer = styled(Card)`
  padding: 0.8rem 1rem;
  margin-top: 1rem;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const IngredientName = styled.p``;
