import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FiTrash } from "react-icons/fi";

import Card from "../shared/Card";
import Icon from "../shared/Icon";

import {
  updateIngredient,
  deleteIngredient,
} from "../../api/ingredientApi";

import IngredientInputs from "./IngredientInputs";

const IngredientEditor = ({ ingredient, closeFunc }) => {
  const availableItems = useSelector((state) => state.items.list);

  const [ingredientCopy, setIngredientCopy] = useState({});
  const [itemOptions, setItemOptions] = useState([]);

  const setValue = (key, value) => {
    const validKey = key === "itemId" ? "item_id" : key;
    const updatedCopy = { ...ingredientCopy, [validKey]: value };
    setIngredientCopy(updatedCopy);
  };

  const saveIngredient = () => {
    updateIngredient(ingredient.recipe_id, ingredientCopy, closeFunc);
  };

  useEffect(() => {
    setIngredientCopy(ingredient);
  }, [ingredient]);

  useEffect(() => {
    if (!_.isEmpty(availableItems)) {
      const options = _.map(availableItems, (item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      setItemOptions(options);
      if (_.isNil(ingredient)) setItemId(_.keys(availableItems)[0]);
    }
  }, [availableItems]);

  return (
    <OuterWrapper>
      <TitleWrapper>
        <Title>Edit Ingredient</Title>
        <Icon
          icon={<FiTrash />}
          label="Remove Ingredient"
          handleFunc={() =>
            deleteIngredient(
              ingredient.recipe_id,
              ingredient.id,
              closeFunc,
            )
          }
        />
      </TitleWrapper>
      <IngredientInputs
        ingredient={ingredientCopy}
        closeFunc={closeFunc}
        setIngredientValue={setValue}
        itemOptions={itemOptions}
        saveFunc={saveIngredient}
      />
    </OuterWrapper>
  );
};

export default IngredientEditor;

const OuterWrapper = styled(Card)`
  margin-top: 1rem;
  width: 100%;
  padding: 1rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.h3`
  margin: 0;

  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;
