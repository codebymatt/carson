import React from "react";
import styled from "styled-components";

const Logo = () => {
  return <LogoWrapper>CARSON</LogoWrapper>;
};

export default Logo;

const LogoWrapper = styled.h1`
  @media (max-width: 400px) {
    font-size: 1.5rem;
  }
`;
