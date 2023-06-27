import { createSlice } from "@reduxjs/toolkit";

export const filterState = createSlice({
  name: "filters",
  initialState: { name: "", tags: [], availableTags: [] },
  reducers: {
    setNameFilterTerm: (state, action) => {
      state.name = action.payload;
    },
    setSelectedTags: (state, action) => {
      state.tags = action.payload;
    },
    setAvailableTags: (state, action) => {
      state.availableTags = action.payload;
    },
  },
});

export const { setNameFilterTerm, setSelectedTags, setAvailableTags } = filterState.actions;

export default filterState.reducer;
