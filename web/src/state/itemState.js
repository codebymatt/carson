import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
// import { useDispatch } from "react-redux";

// const dispatch = useDispatch();

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
    deleteItemFromList: (state, action) => {
      state.list = _.omit(state.list, action.payload);
    },
  },
});

export const { setItemList, deleteItemFromList } = itemState.actions;

export default itemState.reducer;
