import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useSelector } from "react-redux";

import Item from "./Item.js";

const ItemList = () => {
  const items = useSelector((state) => state.items.list);

  return (
    <ItemWrapper>
      {_.map(items, (item) => {
        return <Item item={item} />;
      })}
    </ItemWrapper>
  );
};

export default ItemList;

const ItemWrapper = styled.div``;

const ItemName = styled.p``;
