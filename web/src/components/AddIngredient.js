import _ from "lodash";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { NumericInput, SelectInput } from "./shared/Inputs";

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

const AddIngredient = ({ availableItems }) => {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("");
  const [itemId, setItemId] = useState(null);
  // const [itemName, setItemName] = useState("");
  const [itemOptions, setItemOptions] = useState([]);

  useEffect(() => {
    setUnit(availableUnits[0]);
  }, []);

  // useEffect(() => {
  //   if (itemId !== null) {
  //     setItemName(
  //       availableItems.find((item) => item.id == itemId).name,
  //     );
  //   }
  // }, [itemId]);

  useEffect(() => {
    if (!_.isEmpty(availableItems)) {
      const options = availableItems.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      console.log(options);
      // setItem(availableItems[0]);
      // setItemName(availableItems[0].name);
      setItemId(availableItems[0].id);
      setItemOptions(options);
    }
  }, [availableItems]);

  return (
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
          selectObject={unitOptions.find((obj) => obj.value === unit)}
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
    </InputContainer>
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
