import React from "react";
import styled, { css } from "styled-components";

export const ActionButton = ({ text = "", onClick = () => {} }) => {
  return (
    <StyledActionButton onClick={onClick}>{text}</StyledActionButton>
  );
};

export const SecondaryButton = ({
  text = "",
  onClick = () => {},
}) => {
  return (
    <StyledSecondaryButton onClick={onClick}>
      {text}
    </StyledSecondaryButton>
  );
};

export const InfoButton = ({ text = "", onClick = () => {} }) => {
  return (
    <StyledInfoButton onClick={onClick}>{text}</StyledInfoButton>
  );
};

const defaultButtonStyles = css`
  display: inline-flex;
  align-items: center;
  height: 2.5rem;
  border: none;
  border-radius: 0.25rem;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  background: #0069ed;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:active {
    transform: scale(0.99);
  }
`;

const StyledActionButton = styled.button`
  ${defaultButtonStyles}
`;

const StyledSecondaryButton = styled.button`
  ${defaultButtonStyles}
  background-color: #ffffff;
  color: red;
`;

const StyledInfoButton = styled.button`
  ${defaultButtonStyles}
  background-color: #ffffff;
  color: #0069ed;
  border: solid 1px #0069ed;
`;
