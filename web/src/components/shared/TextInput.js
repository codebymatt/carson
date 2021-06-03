import React from "react";
import styled from "styled-components";

const TextInput = ({ placeholder }) => {
  return <Input placeholder={placeholder} />;
};

export default TextInput;

const Input = styled.input`
  height: 2rem;
  padding-left: 0.5rem;
  font-size: 1rem;
`;
