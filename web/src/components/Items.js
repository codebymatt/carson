import React, { useState } from "react";

import { InnerPageWrapper } from "./shared/Wrappers";
import AddItem from "./AddItem";
import Header from "./Header";
import ItemList from "./ItemList";

const Items = ({ togglePage, currentPage, items, setItems }) => {
  const [addingItem, setAddingItem] = useState(false);

  const addItemToList = (item) => setItems([item, ...items]);

  const deleteItemFromList = (item) => {
    const updatedItems = items.slice();
    const index = updatedItems.indexOf(item);
    if (index > -1) {
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    }
  };

  const toggleItemAddition = () => setAddingItem(!addingItem);

  return (
    <InnerPageWrapper>
      <Header
        currentPage={currentPage}
        togglePage={togglePage}
        addFunction={toggleItemAddition}
      />
      {addingItem && (
        <AddItem
          addItemToList={addItemToList}
          toggleItemAddition={toggleItemAddition}
        />
      )}
      <ItemList
        items={items}
        deleteItemFromList={deleteItemFromList}
      ></ItemList>
    </InnerPageWrapper>
  );
};

export default Items;
