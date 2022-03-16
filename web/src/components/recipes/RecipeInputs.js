import React from "react";
import styled from "styled-components";

import { NumericInput, TextInput } from "./../shared/Inputs";

const RecipeInputs = ({
  name,
  link,
  setName,
  setLink,
  servings,
  setServings,
  calories,
  setCalories,
}) => {
  return (
    <InputWrapper>
      <TextInput
        value={name}
        updateFunc={setName}
        label="Recipe Name"
        placeholder="Something tasty.."
      />
      <TextInput
        value={link}
        updateFunc={setLink}
        label="Web Link"
        placeholder="https://example.com"
      />
      <HorizontalWrapper>
        <SmallInput>
          <NumericInput
            value={servings}
            updateFunc={setServings}
            label="Serves"
            placeholder="4"
          />
        </SmallInput>
        <SmallInput>
          <NumericInput
            value={calories}
            updateFunc={setCalories}
            label="Total calories"
          />
        </SmallInput>
      </HorizontalWrapper>
    </InputWrapper>
  );
};

export default RecipeInputs;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SmallInput = styled.div`
  width: 8rem;
  margin-right: 2rem;
`;
