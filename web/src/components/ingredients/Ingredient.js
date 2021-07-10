import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import styled from "styled-components";

import Card from "../shared/Card";
import Icon from "../shared/Icon";
import IngredientEditor from "./IngredientEditor";

const Ingredient = ({ ingredient }) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      {!editing && (
        <IngredientWrapper>
          <IngredientName>
            {ingredient.full_description}
          </IngredientName>
          <Icon
            icon={<FiEdit />}
            label="Edit ingredient"
            size="small"
            handleFunc={() => setEditing(true)}
          />
        </IngredientWrapper>
      )}
      {editing && (
        <IngredientEditor
          ingredient={ingredient}
          closeFunc={() => setEditing(false)}
        />
      )}
    </>
  );
};

export default Ingredient;

const IngredientWrapper = styled(Card)`
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
