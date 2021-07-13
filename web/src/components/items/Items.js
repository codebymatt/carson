import React, { useState } from "react";

import { InnerPageWrapper } from "../shared/Wrappers";
import ItemCreator from "./ItemCreator";
import NavHeader from "../NavHeader";
import ItemList from "./ItemList";

const Items = () => {
  const [addingItem, setAddingItem] = useState(false);
  const toggleItemAddition = () => setAddingItem(!addingItem);

  return (
    <InnerPageWrapper>
      <NavHeader
        currentPage="item"
        addFunction={() => {
          setAddingItem(true);
        }}
      />
      {addingItem && (
        <ItemCreator toggleItemAddition={toggleItemAddition} />
      )}
      <ItemList />
    </InnerPageWrapper>
  );
};

export default Items;
