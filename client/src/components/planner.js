import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _, { isNil } from "lodash";
import { Box, Card, Flex, Select, TextArea } from "@sanity/ui";

import RadioButton from "./shared/RadioButton";
import Icon from "./shared/Icon";
import { updateRecipeInList } from "../state/recipeState";
import { useSelector } from "react-redux";
import store from "../store";
import { ingredientDescription } from "../utils/ingredientDescription";
import { FiMinusCircle, FiPlusCircle, FiX, FiXCircle } from "react-icons/fi";

const COLUMN_NAMES = ["Breakfast", "Lunch", "Dinner"];
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Planner = () => {
  const availableRecipes = useSelector((state) => state.recipes.selectedRecipes);
  return (
    <Flex direction="column">
      {/* <HeaderRow /> */}
      {WEEKDAYS.map((weekday, index) => (
        <Day weekday={weekday} availableRecipes={availableRecipes} />
      ))}
    </Flex>
  );
};

export default Planner;

const generateServingsArray = (count) => {
  console.log("count: " + count);
  const ary = [];
  for (var i = 1; i <= count; i++) {
    ary.push(i);
  }
  console.log("count: " + ary);
  return ary;
};

const Day = ({ weekday, availableRecipes }) => {
  const [recipeID, setRecipeID] = useState("");
  const [availableServingCount, setAvailableServingCount] = useState(0);
  const [servingCount, setServingCount] = useState(0);
  const [servingArray, setServingArray] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState();

  const handleSelection = (event) => {
    const id = event.target.value;
    console.log("servings: " + availableRecipes[id].servings);
    setRecipeID(id);
    setSelectedRecipe(availableRecipes[id]);
    setAvailableServingCount(availableRecipes[id].servings);
    setServingArray(generateServingsArray(availableRecipes[id].servings));
  };

  // const selectedServings = [];
  // if (recipeID != "") {
  //   for (const i = 0; i < selectedRecipe.servings; i++) {
  //     selectedServings += i;
  //   }
  // }

  useEffect(() => {
    setSelectedRecipe(availableRecipes[recipeID]);
  }, [availableRecipes]);

  return (
    <DayWrapper>
      <TitleWrapper>
        <WeekdayTitle>{weekday}</WeekdayTitle>
        <Underline />
      </TitleWrapper>
      <DayInner radius={2} padding={0} marginTop={3}>
        <MealContainer>
          {COLUMN_NAMES.map((name) => {
            return (
              <MealWrapper>
                <MealName>{name}</MealName>
                <SelectWrapper>
                  <Select onChange={handleSelection} fontSize={2}>
                    <option></option>
                    {_.keys(availableRecipes).map((recipeID) => {
                      console.log(recipeID);
                      const recipe = availableRecipes[recipeID];
                      return <option value={recipeID}>{recipe.name}</option>;
                    })}
                    <option>OUT</option>
                  </Select>
                  <QuantityWrapper>
                    <Select>
                      <option value={0}>0</option>
                      {servingArray.map((num) => (
                        <option value={num}>{num}</option>
                      ))}
                    </Select>
                  </QuantityWrapper>
                </SelectWrapper>
              </MealWrapper>
            );
          })}
        </MealContainer>
        <NotesWrapper>
          <h3>Notes</h3>
          <TextArea />
        </NotesWrapper>
      </DayInner>
    </DayWrapper>
  );
};

const TitleWrapper = styled.div`
  display: inline-block;
`;

const Underline = styled.div`
  height: 0.5rem;
  width: 120%;
  background-color: #c9e4de;
`;

const MealContainer = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
`;

const QuantityWrapper = styled.div`
  margin-top: 0.5rem;
  max-width: 4rem;
`;

const SelectWrapper = styled(Flex)`
  flex-direction: column;
  margin-top: 0.5rem;
  justify-content: space-between;
`;

const NotesWrapper = styled(Flex)`
  flex-direction: column;

  h3 {
    margin-bottom: 0.5rem;
  }
`;

const DayWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 2rem;
  justify-content: space-between;
`;

const WeekdayTitle = styled.h2`
  margin: 0;
`;

const MealWrapper = styled(Flex)`
  flex-direction: column;
  width: 30%;
`;

const DayInner = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MealName = styled.h3`
  margin: 0;
`;
