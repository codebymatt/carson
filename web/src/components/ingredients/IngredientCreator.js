import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useSelector } from "react-redux";

import Card from "../shared/Card";
import availableUnits from "./availableUnits";

import IngredientInputs from "./IngredientInputs";

import { addIngredient } from "../../api/ingredientsApi";

const IngredientCreator = ({ closeFunc, recipeId }) => {
  const availableItems = useSelector((state) => state.items.list);

  const [ingredient, setIngredient] = useState({});
  const [itemOptions, setItemOptions] = useState([]);
  const setValue = (key, value) =>
    setIngredient({ ...ingredient, [key]: value });

  const saveIngredient = () =>
    addIngredient(recipeId, ingredient, resetInputs);

  const resetInputs = () => {
    setQuantity(1);
    setUnit(availableUnits[0]);
    setDescription("");
    setItemId(_.keys(availableItems)[0]);
  };

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
      <Title>Add Ingredient</Title>
      <IngredientInputs
        ingredient={ingredient}
        closeFunc={closeFunc}
        setIngredientValue={setValue}
        itemOptions={itemOptions}
        saveFunc={saveIngredient}
      />
    </OuterWrapper>
  );
};

export default IngredientCreator;

const OuterWrapper = styled(Card)`
  width: 100%;
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0;

  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;
