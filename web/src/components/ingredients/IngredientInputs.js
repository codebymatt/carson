import React, { useState } from "react";
import styled from "styled-components";

import Card from "../shared/Card";
import {
  NumericInput,
  SelectInput,
  TextInput,
} from "../shared/Inputs";

import availableUnits from "./availableUnits";
import {
  ActionButton,
  SecondaryButton,
  InfoButton,
} from "../shared/Buttons";

const unitOptions = availableUnits.map((unit) => {
  return {
    value: unit,
    label: unit,
  };
});

const IngredientInputs = ({
  ingredient,
  setIngredientValue,
  closeFunc,
  saveFunc,
  itemOptions,
  enableItemAddition,
}) => {
  const itemId = _.isNil(ingredient.itemId)
    ? ingredient.item_id
    : ingredient.itemId;

  return (
    <>
      <InputContainer>
        <InputWrapper>
          <NumericInput
            label="Quantity"
            value={ingredient.quantity}
            updateFunc={(value) =>
              setIngredientValue("quantity", value)
            }
          />
        </InputWrapper>
        <InputWrapper>
          <SelectInput
            selectObject={unitOptions.find(
              (obj) => obj.value === ingredient.unit,
            )}
            label="Unit"
            options={unitOptions}
            updateFunc={(value) => setIngredientValue("unit", value)}
          />
        </InputWrapper>
        <InputWrapper>
          <SelectInput
            selectObject={itemOptions.find(
              (obj) => obj.value === itemId,
            )}
            label="Name"
            options={itemOptions}
            updateFunc={(value) =>
              setIngredientValue("item_id", value)
            }
          />
        </InputWrapper>
        <InputWrapper>
          <TextInput
            label="Description"
            placeholder={"Chopped"}
            value={ingredient.description}
            updateFunc={(value) =>
              setIngredientValue("description", value)
            }
          />
        </InputWrapper>
      </InputContainer>
      <ButtonContainer>
        <IngredientButtons>
          <ActionButton
            text={ingredient === null ? "Add" : "Save"}
            onClick={saveFunc}
          />
          <SecondaryButton text="Cancel" onClick={closeFunc} />
        </IngredientButtons>
        <InfoButton
          text="New ingredient"
          onClick={enableItemAddition}
        />
      </ButtonContainer>
    </>
  );
};

export default IngredientInputs;

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
  justify-content: space-between;
  margin-top: 1.5rem;
  align-items: center;
`;

const IngredientButtons = styled.div`
  display: flex;
`;
