import React from "react";
import styled from "styled-components";
import { FiTrash } from "react-icons/fi";

import Card from "./shared/Card";
import axios from "axios";

const ItemList = ({ items, deleteItemFromList }) => {
  const deleteItem = (item) => {
    axios
      .delete(`/v1/items/${item.id}.json`)
      .then(() => {
        deleteItemFromList(item);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ItemWrapper>
      {items.map((item) => (
        <Item>
          <ItemName>{item.full_description}</ItemName>
          <IconWrapper onClick={() => deleteItem(item)}>
            <DeleteIcon size="20px"></DeleteIcon>
          </IconWrapper>
        </Item>
      ))}
    </ItemWrapper>
  );
};

export default ItemList;

const ItemWrapper = styled.div``;

const Item = styled(Card)`
  padding: 0rem 1rem;
  margin-top: 1rem;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ItemName = styled.p``;

const IconWrapper = styled.div``;

const DeleteIcon = styled(FiTrash)`
  cursor: pointer;
`;
