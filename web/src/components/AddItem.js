import React from "react";
import styled from "styled-components";
import Select from "react-select";

import Card from "./shared/Card";
import TextInput from "./shared/TextInput";

const quantityOptions = [
  { value: "whole", label: "Whole" },
  { value: "grams", label: "Grams" },
];

const AddItem = () => (
  <OuterWrapper>
    <Title>Add Item</Title>
    <TextInput placeholder="Tomato" />
    <Select options={quantityOptions} />
  </OuterWrapper>
);

export default AddItem;

const OuterWrapper = styled(Card)`
  height: 10rem;
  width: 100%;
  padding: 1rem;
`;

const Title = styled.h3`
  margin-top: 0;
`;

const SelectInput = styled.select``;
