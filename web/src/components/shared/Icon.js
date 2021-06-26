import React from "react";
import styled from "styled-components";

const calculateIconSize = (size) => {
  switch (size) {
    case "small":
      return "20px";
    case "large":
      return "28px";
    default:
      return "24px";
  }
};

const constructIconParameters = (size, disabled) => {
  const iconSize = calculateIconSize(size);

  if (disabled) return { size: iconSize, color: "#999" };
  return { size: iconSize };
};

const Icon = ({
  icon,
  size = "small",
  label = "",
  handleFunc = () => {},
  disabled = false,
}) => {
  const iconParams = constructIconParameters(size, disabled);

  return (
    <ClickableIcon label={label} onClick={handleFunc}>
      {React.cloneElement(icon, iconParams)}
    </ClickableIcon>
  );
};

export default Icon;

const ClickableIcon = styled.div`
  cursor: pointer;
`;
