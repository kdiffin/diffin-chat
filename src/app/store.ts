import { configureStore } from "@reduxjs/toolkit";
import popupSlice from "../redux/popupSlice";
import searchbarSlice from "../redux/searchbarSlice";

export const store = configureStore({
  // the store name has to be equal to the "name" value in the associated slice object
  reducer: {
    search: searchbarSlice,
    popup: popupSlice
  },
});
