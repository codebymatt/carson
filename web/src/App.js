import React, { useState } from "react";
import styled from "styled-components";
import { PlusIcon } from "@primer/octicons-react";

import AddItem from "./components/AddItem";

import "./App.css";

const App = () => {
  const [addingItem, setAddingItem] = useState(true);

  const toggleItemAddition = () => setAddingItem(!addingItem);

  return (
    <PageWrapper>
      :
      <InnerWrapper>
        <Header>
          <Logo>CARSON</Logo>
          <ClickableIcon onClick={() => toggleItemAddition()}>
            <Plus size="medium" label="Add item" />
          </ClickableIcon>
        </Header>
        {addingItem && <AddItem />}
      </InnerWrapper>
    </PageWrapper>
  );
};

export default App;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const InnerWrapper = styled.div`
  width: 40rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 1rem;
`;

const Logo = styled.h1``;

const Plus = styled(PlusIcon)`
  cursor: pointer;
`;

const ClickableIcon = styled.div``;
