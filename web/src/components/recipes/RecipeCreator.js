import _ from "lodash";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { InnerPageWrapper } from "../shared/Wrappers";
import Header from "./Header";

const RecipeEditor = () => {
  // const { id } = useParams();

  const [savingEnabled, setSavingEnabled] = useState(false);

  return (
    <InnerPageWrapper>
      <Header savingEnabled={savingEnabled} />
      {/* {_.isNil(id) && } */}
    </InnerPageWrapper>
  );
};

export default RecipeEditor;
