import React from "react";
import styled from "styled-components";

const Logo = ({ text }) => {
  return <LogoWrapper>{text}</LogoWrapper>;
};

export default Logo;

const LogoWrapper = styled.h1`
  @media (max-width: 400px) {
    font-size: 1.5rem;
  }
`;
