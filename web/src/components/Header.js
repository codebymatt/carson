import React, { useState } from "react";
import styled from "styled-components";

import { FiPlus, FiBookOpen, FiList } from "react-icons/fi";

import Icon from "./shared/Icon";

const Header = ({
  currentPage = "items",
  togglePage,
  addFunction,
}) => {
  const NavIcon = currentPage == "recipes" ? FiList : FiBookOpen;
  const navLabel = currentPage == "recipes" ? "Recipes" : "Items";

  return (
    <HeaderWrapper>
      <Logo>CARSON</Logo>
      <IconContainer>
        <IconWrapper>
          <Icon
            icon={<NavIcon />}
            size="medium"
            label={navLabel}
            handleFunc={togglePage}
          />
        </IconWrapper>
        <IconWrapper>
          <Icon
            icon={<FiPlus />}
            size="medium"
            label="Add item"
            handleFunc={addFunction}
          />
        </IconWrapper>
      </IconContainer>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 1rem;
`;

const Logo = styled.h1`
  @media (max-width: 400px) {
    font-size: 1.5rem;
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-left: 1rem;
`;
