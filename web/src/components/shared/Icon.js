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

const Icon = ({
  icon,
  size = "small",
  label = "",
  handleFunc = () => {},
}) => {
  const iconSize = calculateIconSize(size);

  return (
    <ClickableIcon label={label} onClick={handleFunc}>
      {React.cloneElement(icon, { size: iconSize })}
    </ClickableIcon>
  );
};

export default Icon;

const ClickableIcon = styled.div`
  cursor: pointer;
`;
