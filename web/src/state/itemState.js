import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export const itemState = createSlice({
  name: "items",
  initialState: { list: {} },
  reducers: {
    setItemList: (state, action) => {
      state.list = action.payload.reduce((memo, item) => {
        return {
          ...memo,
          [item.id]: item,
        };
      }, {});
    },
    addItemToList: (state, action) => {
      state.list = {
        ...state.list,
        ...{ [action.payload.id]: action.payload },
      };
    },
    deleteItemFromList: (state, action) => {
      state.list = _.omit(state.list, action.payload);
    },
    updateItemInList: (state, action) => {
      state.list = {
        ...state.list,
        ...{ [action.payload.id]: action.payload },
      };
    },
  },
});

export const {
  setItemList,
  addItemToList,
  deleteItemFromList,
  updateItemInList,
} = itemState.actions;

export default itemState.reducer;
