import React from "react";
import styled from "styled-components";
import { FiX, FiCheckCircle } from "react-icons/fi";
import { useHistory, withRouter } from "react-router-dom";

import Logo from "../shared/Logo";
import Icon from "../shared/Icon";

const Header = ({ savingEnabled, saveFunc }) => {
  const history = useHistory();

  return (
    <HeaderWrapper>
      <Logo />
      <IconContainer>
        <IconWrapper>
          <Icon
            icon={<FiCheckCircle />}
            size="medium"
            label="Save recipe"
            handleFunc={saveFunc}
            disabled={!savingEnabled}
          />
        </IconWrapper>
        <IconWrapper>
          <Icon
            icon={<FiX />}
            size="medium"
            label="Cancel"
            handleFunc={() => history.push("/recipes")}
          />
        </IconWrapper>
      </IconContainer>
    </HeaderWrapper>
  );
};

export default withRouter(Header);

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
