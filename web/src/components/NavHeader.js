import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { FiPlus, FiBookOpen, FiList } from "react-icons/fi";

import Icon from "./shared/Icon";
import Logo from "./shared/Logo";

const NavHeader = ({
  currentPage = "recipe",
  addFunction = () => {},
  title = "CARSON",
}) => {
  return (
    <HeaderWrapper>
      <Logo text={title} />
      <IconContainer>
        {currentPage === "recipe" && (
          <IconWrapper>
            <UnstyledLink to="/items">
              <Icon icon={<FiList />} size="medium" label="Items" />
            </UnstyledLink>
          </IconWrapper>
        )}
        {currentPage === "item" && (
          <IconWrapper>
            <UnstyledLink to="/recipes">
              <Icon
                icon={<FiBookOpen />}
                size="medium"
                label="Recipes"
              />
            </UnstyledLink>
          </IconWrapper>
        )}
        <IconWrapper>
          <Icon
            icon={<FiPlus />}
            size="medium"
            label={`Add ${currentPage}`}
            handleFunc={addFunction}
          />
        </IconWrapper>
      </IconContainer>
    </HeaderWrapper>
  );
};

export default NavHeader;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 1rem;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-left: 1rem;
`;

const UnstyledLink = styled(Link)`
  all: unset;
`;
