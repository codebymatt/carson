import _ from "lodash";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./shared/Card";

import {
  NumericInput,
  SelectInput,
  TextInput,
} from "./shared/Inputs";
import { ActionButton, SecondaryButton } from "./shared/Buttons";
import axios from "axios";
import Icon from "./shared/Icon";
import { FiTrash } from "react-icons/fi";
import { useSelector } from "react-redux";

const availableUnits = [
  "whole",
  "bottle",
  "kilogram",
  "pound",
  "ounces",
  "milliliter",
  "grams",
  "teaspoon",
  "tablespoon",
  "tin",
  "block",
  "clove",
];

const unitOptions = availableUnits.map((unit) => {
  return {
    value: unit,
    label: unit,
  };
});

const AddIngredient = ({
  closeFunc,
  recipeId,
  ingredient = null,
  removeIngredientFromRecipe = () => {},
}) => {
  const availableItems = useSelector((state) => state.items.list);
  if (ingredient === null) setItemId(_.keys(availableItems)[0]);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const [itemId, setItemId] = useState(null);
  const [itemOptions, setItemOptions] = useState([]);
  const [ingredientId, setIngredientId] = useState(null);

  const resetInputs = () => {
    setQuantity(1);
    setUnit(availableUnits[0]);
    setDescription("");
    setItemId(_.keys(availableItems)[0]);
  };

  const addIngredient = () => {
    axios
      .post(`/v1/recipes/${recipeId}/recipe_items.json`, {
        recipe_item: {
          item_id: itemId,
          quantity: quantity,
          unit: unit,
          description: description,
        },
      })
      .then((response) => {
        console.log(response.data);
        resetInputs();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveIngredient = () => {
    axios
      .put(
        `/v1/recipes/${recipeId}/recipe_items/${ingredientId}.json`,
        {
          recipe_item: {
            item_id: itemId,
            quantity: quantity,
            unit: unit,
            description: description,
          },
        },
      )
      .then((response) => {
        closeFunc();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setInputValues = () => {
    const {
      id: ingredientId,
      quantity,
      unit,
      description,
      item_id: itemId,
    } = ingredient;
    console.log(itemId);

    setQuantity(quantity);
    setUnit(unit);
    setDescription(description);
    setItemId(itemId);
    setIngredientId(ingredientId);
  };

  const deleteIngredient = () => {
    axios
      .delete(
        `/v1/recipes/${recipeId}/recipe_items/${ingredientId}.json`,
        {
          recipe_item: {
            item_id: itemId,
            quantity: quantity,
            unit: unit,
            description: description,
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        closeFunc();
        removeIngredientFromRecipe(recipeId, ingredientId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (ingredient != null) {
      setInputValues();
    } else {
      setUnit(availableUnits[0]);
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(availableItems)) {
      const options = _.map(availableItems, (item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      setItemOptions(options);
      if (ingredient === null) setItemId(_.keys(availableItems)[0]);
    }
  }, [availableItems]);

  return (
    <OuterWrapper>
      <TitleWrapper>
        <Title>{`${
          ingredient === null ? "Add" : "Edit"
        } Ingredient`}</Title>
        {ingredient != null && (
          <Icon
            icon={<FiTrash />}
            label="Remove ingredient"
            handleFunc={deleteIngredient}
          />
        )}
      </TitleWrapper>
      <InputContainer>
        <InputWrapper>
          <NumericInput
            label="Quantity"
            placeholder={1}
            value={quantity}
            updateFunc={setQuantity}
          />
        </InputWrapper>
        <InputWrapper>
          <SelectInput
            selectObject={unitOptions.find(
              (obj) => obj.value === unit,
            )}
            label="Unit"
            options={unitOptions}
            updateFunc={setUnit}
          />
        </InputWrapper>
        <InputWrapper>
          <SelectInput
            selectObject={itemOptions.find(
              (obj) => obj.value === itemId,
            )}
            label="Name"
            options={itemOptions}
            updateFunc={setItemId}
          />
        </InputWrapper>
        <InputWrapper>
          <TextInput
            label="Description"
            placeholder={"Chopped"}
            value={description}
            updateFunc={setDescription}
          />
        </InputWrapper>
      </InputContainer>
      <ButtonContainer>
        <ActionButton
          text={ingredient === null ? "Add" : "Save"}
          onClick={
            ingredient === null ? addIngredient : saveIngredient
          }
        />
        <SecondaryButton text="Cancel" onClick={closeFunc} />
      </ButtonContainer>
    </OuterWrapper>
  );
};

export default AddIngredient;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const InputWrapper = styled.div`
  margin-right: 1.5rem;
`;

const OuterWrapper = styled(Card)`
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.5rem;
`;
