import React from "react";
import styled from "styled-components";
import Select from "react-select";
import _ from "lodash";

export const TextInput = ({
  placeholder = "",
  label = "",
  value = "",
  updateFunc = () => {},
}) => {
  const input = (
    <StyledInput
      value={value}
      type="text"
      placeholder={placeholder}
      onChange={(event) => updateFunc(event.target.value)}
    />
  );

  return <LabelledInput label={label} component={input} />;
};

export const NumericInput = ({
  min = 0,
  placeholder = "",
  label = "",
  value = "",
  updateFunc = () => {},
}) => {
  const input = (
    <StyledInput
      value={value}
      type="number"
      min={min}
      placeholder={placeholder}
      onChange={(event) => updateFunc(event.target.value)}
    />
  );

  return <LabelledInput label={label} component={input} />;
};

export const SelectInput = ({
  label = "",
  styles,
  selectObject = {},
  options = [],
  updateFunc = () => {},
}) => {
  const finalStyles = { ...selectStyles, styles };
  const input = (
    <StyledSelect
      defaultValue={selectObject.value}
      value={selectObject}
      styles={finalStyles}
      options={options}
      onChange={(selected) => updateFunc(selected.value)}
    />
  );

  return <LabelledInput label={label} component={input} />;
};

const LabelledInput = ({ label, component }) => {
  return (
    <InputWrapper>
      {!_.isNil(label) && <Label>{label || "Text"}</Label>}
      {component}
    </InputWrapper>
  );
};

const InputWrapper = styled.div``;

const Label = styled.h4`
  margin-bottom: 0.2rem;
  font-weight: 400;
  // padding-left: 0.5rem;
`;

const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    height: "2.5rem",
  }),
};

const StyledSelect = styled(Select)`
  width: 12rem;
`;

const StyledInput = styled.input`
  height: 2.5rem;
  max-width: 10rem;
  padding-left: 0.5rem;
  font-size: 1rem;
  border-color: hsl(0, 0%, 80%);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;

  &:focus {
    outline: 0 !important;
    outline-color: currentcolor;
    outline-style: none;
    outline-width: 0px;
    border-color: #2684ff;
    border-radius: 0.25rem;
    border-style: solid;
    border-width: 2px;
    box-shadow: 0 0 0 1px #2684ff;
  }

  -webkit-inner-spin-button,
  -webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`;
