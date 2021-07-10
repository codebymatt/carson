import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { useSelector } from "react-redux";
import { FiTrash } from "react-icons/fi";

import Card from "../shared/Card";
import Icon from "../shared/Icon";
import { deleteItem } from "../../api/itemApi";

const ItemList = () => {
  const items = useSelector((state) => state.items.list);

  return (
    <ItemWrapper>
      {_.map(items, (item) => {
        return (
          <Item key={item.id}>
            <ItemName>{item.name}</ItemName>
            <Icon
              icon={<FiTrash />}
              label="Delete item"
              size="small"
              handleFunc={() => deleteItem(item.id)}
            />
          </Item>
        );
      })}
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
