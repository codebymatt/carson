import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import Card from "./shared/Card";

import {
  TextInput,
  NumericInput,
  SelectInput,
} from "./shared/Inputs";

import { ActionButton, SecondaryButton } from "./shared/Buttons";

const baseUnits = [
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

const unitOptions = baseUnits.map((unit) => {
  return {
    value: unit,
    label: unit,
  };
});

const AddItem = ({ toggleItemAddition, addItemToList }) => {
  // const [quantity, setQuantity] = useState("");
  // const [baseUnit, setBaseUnit] = useState("");
  const [itemName, setItemName] = useState("");

  const resetInputs = () => {
    // setQuantity("");
    // setBaseUnit(baseUnits[0]);
    setItemName("");
  };

  const saveItem = () => {
    axios
      .post("/v1/items.json", {
        item: {
          // base_quantity: quantity,
          // unit: baseUnit,
          name: itemName,
        },
      })
      .then((response) => {
        addItemToList(response.data.item);
        resetInputs();
      })
      .catch((error) => console.log(error.message));
  };

  // useEffect(() => {
  //   setBaseUnit(baseUnits[0]);
  // }, []);

  return (
    <OuterWrapper>
      <Title>Add Item</Title>
      <InputContainer>
        {/* <InputWrapper>
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
              (obj) => obj.value === baseUnit,
            )}
            label="Base Unit"
            options={unitOptions}
            updateFunc={setBaseUnit}
          />
        </InputWrapper> */}
        <InputWrapper>
          <TextInput
            value={itemName}
            label="Name"
            placeholder="Tomato"
            updateFunc={setItemName}
          />
        </InputWrapper>
      </InputContainer>
      <ButtonContainer>
        <ActionButton text="Add" onClick={saveItem} />
        <SecondaryButton text="Cancel" onClick={toggleItemAddition} />
      </ButtonContainer>
    </OuterWrapper>
  );
};

export default AddItem;

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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.5rem;
`;
