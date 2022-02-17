import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useSelector } from "react-redux";

import Card from "../shared/Card";

import IngredientInputs from "./IngredientInputs";

import { addIngredient } from "../../api/ingredientApi";
import ItemCreator from "../items/ItemCreator";

const IngredientCreator = ({ closeFunc, recipeId }) => {
  const availableItems = useSelector((state) => state.items.list);

  const [ingredient, setIngredient] = useState({});
  const [itemOptions, setItemOptions] = useState([]);
  const setValue = (key, value) =>
    setIngredient({ ...ingredient, [key]: value });

  const resetInputs = () => setIngredient({});

  const saveIngredient = () => {
    addIngredient(recipeId, ingredient, resetInputs);
  };

  const [addingNewItem, setAddingNewItem] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(availableItems)) {
      const options = _.map(availableItems, (item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      setItemOptions(options);
      if (_.isNil(ingredient))
        setValue("item_id", _.keys(availableItems)[0]);
    }
  }, [availableItems]);

  return (
    <>
      {!addingNewItem && (
        <OuterWrapper>
          <Title>Add Ingredient</Title>
          <IngredientInputs
            ingredient={ingredient}
            closeFunc={closeFunc}
            setIngredientValue={setValue}
            itemOptions={itemOptions}
            saveFunc={saveIngredient}
            enableItemAddition={() => {
              setAddingNewItem(true);
            }}
          />
        </OuterWrapper>
      )}
      {addingNewItem && (
        <>
          <ItemCreator
            toggleItemAddition={() => setAddingNewItem(false)}
          />
        </>
      )}
    </>
    // </OuterWrapper>
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
