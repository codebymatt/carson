import React from "react";
import styled from "styled-components";

import { TextInput } from "./../shared/Inputs";

const RecipeInputs = ({ name, link, setName, setLink }) => {
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
    </InputWrapper>
  );
};

export default RecipeInputs;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;
