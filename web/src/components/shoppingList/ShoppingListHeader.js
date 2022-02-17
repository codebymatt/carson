import React from "react";
import styled from "styled-components";
import {
  FiX,
  FiCheckCircle,
  FiTrash,
  FiPlus,
  FiPlusCircle,
  FiDownloadCloud,
} from "react-icons/fi";
import { useHistory, withRouter } from "react-router-dom";

import Logo from "../shared/Logo";
import Icon from "../shared/Icon";

const ShoppingListHeader = ({ title }) => {
  const history = useHistory();

  return (
    <HeaderWrapper>
      <Logo text={title} />
      <IconContainer>
        <IconWrapper>
          <Icon
            icon={<FiDownloadCloud />}
            size="medium"
            label="Download shopping list"
            // handleFunc={saveRecipe}
            disabled
          />
        </IconWrapper>
        <IconWrapper>
          <Icon
            icon={<FiPlus />}
            size="medium"
            label="Save recipe"
            // handleFunc={saveRecipe}
            // disabled={!savingEnabled}
          />
        </IconWrapper>
        <IconWrapper>
          <Icon
            icon={<FiTrash />}
            size="medium"
            label="Clear list"
            handleFunc={() => history.push("/recipes")}
          />
        </IconWrapper>
      </IconContainer>
    </HeaderWrapper>
  );
};

export default withRouter(ShoppingListHeader);

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
