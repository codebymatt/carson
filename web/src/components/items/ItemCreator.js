import React, { useState } from "react";
import styled from "styled-components";

import Card from "../shared/Card";

import { TextInput } from "../shared/Inputs";

import { ActionButton, SecondaryButton } from "../shared/Buttons";
import { createItem } from "../../api/itemApi";

const ItemCreator = ({ toggleItemAddition }) => {
  const [itemName, setItemName] = useState("");
  const resetInputs = () => setItemName("");

  const saveItem = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    createItem({ name: itemName }, resetInputs);
  };

  return (
    <OuterWrapper>
      <FormWrapper>
        <Title>Add Item</Title>
        <InputContainer>
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
          <SecondaryButton
            text="Cancel"
            onClick={toggleItemAddition}
          />
        </ButtonContainer>
      </FormWrapper>
    </OuterWrapper>
  );
};

export default ItemCreator;

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

const FormWrapper = styled.form``;

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
