import React from "react";
import styled from "styled-components";

import { PlusIcon } from "@primer/octicons-react";

const Header = ({ addFunction }) => {
  return (
    <HeaderWrapper>
      <Logo>CARSON</Logo>
      <ClickableIcon onClick={() => addFunction()}>
        <Plus size="medium" label="Add item" />
      </ClickableIcon>
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

const Plus = styled(PlusIcon)`
  cursor: pointer;
`;

const ClickableIcon = styled.div``;
