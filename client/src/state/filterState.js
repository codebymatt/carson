import { createSlice } from "@reduxjs/toolkit";

export const filterState = createSlice({
  name: "filters",
  initialState: { name: "", tags: [] },
  reducers: {
    setNameFilterTerm: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setNameFilterTerm } = filterState.actions;

export default filterState.reducer;
