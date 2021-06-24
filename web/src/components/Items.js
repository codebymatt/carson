import React, { useEffect, useState } from "react";
import axios from "axios";

import { InnerPageWrapper } from "./shared/Wrappers";

import AddItem from "./AddItem";
import Header from "./Header";
import ItemList from "./ItemList";

const Items = ({ togglePage, currentPage }) => {
  const [addingItem, setAddingItem] = useState(false);
  const [items, setItems] = useState([]);

  const addItemToList = (item) => setItems([item, ...items]);

  const deleteItemFromList = (item) => {
    const updatedItems = items.slice();
    const index = updatedItems.indexOf(item);
    if (index > -1) {
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    }
  };

  useEffect(() => {
    axios
      .get("/v1/items.json")
      .then((response) => {
        setItems(response.data.items);
      })
      .catch((error) => console.log(error));
  }, []);

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
