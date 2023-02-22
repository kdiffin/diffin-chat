import { createSlice } from "@reduxjs/toolkit";

export const searchbarSlice = createSlice({
  //this only handles the closing and opening of the searchbar
  //okay yeah redux was WAYYY too  overkill just to implement this header feature, but at the time of making this feature I was not aware of something like jotai or useContext.
  name: "search",
  initialState: {
    searchOpen:  false,
  },
  reducers: {
    openSearchbar: (state) => {
      state.searchOpen = true;
    },
    closeSearchbar: (state) => {
      state.searchOpen = false;
    },
  },
});

export const { openSearchbar, closeSearchbar } = searchbarSlice.actions;

export const selectSearchbar = (state: { search: { searchOpen: boolean; }; }) => state.search.searchOpen;

export default searchbarSlice.reducer;
 