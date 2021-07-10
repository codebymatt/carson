import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";

import { createRecipe } from "../../api/recipeApi";
import { InnerPageWrapper } from "../shared/Wrappers";
import Header from "./Header";
import RecipeInputs from "./RecipeInputs";

const RecipeEditor = () => {
  const history = useHistory();
  const [savingEnabled, setSavingEnabled] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const onCreate = () => {
    const switchToEditingMode = (recipeId) => {
      history.push(`/recipes/${recipeId}`);
    };

    createRecipe({ name: name, link: link }, switchToEditingMode);
  };

  useEffect(() => {
    const namePresent = name != "";
    setSavingEnabled(namePresent);
  }, [name, link]);

  return (
    <InnerPageWrapper>
      <Header savingEnabled={savingEnabled} saveFunc={onCreate} />
      <RecipeInputs
        name={name}
        setName={setName}
        link={link}
        setLink={setLink}
      />
      <PlaceholderWrapper>
        Once you've given your recipe a name and saved it you can add
        ingredients!
      </PlaceholderWrapper>
    </InnerPageWrapper>
  );
};

export default withRouter(RecipeEditor);

const PlaceholderWrapper = styled.div`
  margin-top: 2rem;
`;
