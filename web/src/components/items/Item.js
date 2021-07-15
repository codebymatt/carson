import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiEdit, FiTrash, FiX, FiCheckCircle } from "react-icons/fi";

import Card from "../shared/Card";
import { TextInput } from "../shared/Inputs";
import Icon from "../shared/Icon";
import { updateItem, deleteItem } from "../../api/itemApi";

const Item = ({ item }) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      {!editing && (
        <ShowItem
          setEditing={setEditing}
          itemId={item.id}
          itemName={item.name}
        />
      )}
      {editing && (
        <EditItem
          itemId={item.id}
          itemName={item.name}
          setEditing={setEditing}
        />
      )}
    </>
  );
};

export default Item;

const ShowItem = ({ setEditing, itemId, itemName }) => {
  return (
    <ItemWrapper>
      <ItemName>{itemName}</ItemName>
      <IconContainer>
        <IconWrapper>
          <Icon
            icon={<FiEdit />}
            label="Edit item"
            size="small"
            handleFunc={() => setEditing(true)}
          />
        </IconWrapper>
        <IconWrapper>
          <Icon
            icon={<FiTrash />}
            label="Delete item"
            size="small"
            handleFunc={() => deleteItem(itemId)}
          />
        </IconWrapper>
      </IconContainer>
    </ItemWrapper>
  );
};

const EditItem = ({ setEditing, itemId, itemName }) => {
  const [itemNameCopy, setItemNameCopy] = useState("");
  const [canSave, setCanSave] = useState(false);

  const saveChanges = () => {
    const closeFunc = setEditing(false);
    updateItem(itemId, itemNameCopy, closeFunc);
  };

  useEffect(() => {
    const nameUnchanged = itemNameCopy === itemName;
    setCanSave(!nameUnchanged);
  }, [itemNameCopy]);

  useEffect(() => {
    setItemNameCopy(itemName);
  }, [itemName]);

  return (
    <ItemWrapper>
      <TextInput
        value={itemNameCopy}
        label={null}
        placeholder="Tomato"
        updateFunc={setItemNameCopy}
      />
      <IconContainer>
        <IconWrapper>
          <Icon
            icon={<FiCheckCircle />}
            label="Save item"
            size="small"
            disabled={!canSave}
            handleFunc={saveChanges}
          />
        </IconWrapper>
        <IconWrapper>
          <Icon
            icon={<FiX />}
            label="Stop editing"
            size="small"
            handleFunc={() => setEditing(false)}
          />
        </IconWrapper>
      </IconContainer>
    </ItemWrapper>
  );
};

const ItemWrapper = styled(Card)`
  padding: 0rem 1rem;
  height: 4rem;
  margin-top: 1rem;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ItemName = styled.p``;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconWrapper = styled.div`
  margin-left: 1rem;
`;
