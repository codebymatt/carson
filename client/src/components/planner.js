import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _, { isNil } from "lodash";
import { Box, Card, Flex, Select, TextArea } from "@sanity/ui";

import RadioButton from "./shared/RadioButton";
import Icon from "./shared/Icon";
import { updateRecipeInList } from "../state/recipeState";
import { useSelector } from "react-redux";
// import store from "../store";
import { ingredientDescription } from "../utils/ingredientDescription";
import { FiMinusCircle, FiPlusCircle, FiX, FiXCircle } from "react-icons/fi";

const COLUMN_NAMES = ["Breakfast", "Lunch", "Dinner"];
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Planner = () => {
  return (
    <Flex direction="column">
      {/* <HeaderRow /> */}
      {WEEKDAYS.map((weekday, index) => (
        <Day weekday={weekday} />
      ))}
    </Flex>
  );
};

export default Planner;

const Day = ({ weekday }) => {
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
                  <Select fontSize={2}>
                    <option> </option>
                    <option>OUT</option>
                  </Select>
                  <QuantityWrapper>
                    <Select>
                      <option> </option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>14</option>
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
