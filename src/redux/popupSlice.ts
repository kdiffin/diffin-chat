import { createSlice } from "@reduxjs/toolkit";

export const popupSlice = createSlice({
  
  name: "popup",
  initialState: {
    popupOpen:  false,
  },
  reducers: {
    openPopup: (state) => {
      state.popupOpen = true;
    },
    closePopup: (state) => {
      state.popupOpen = false;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;

export const selectPopup = (state: { popup: { popupOpen: boolean; }; }) => state.popup.popupOpen;

export default popupSlice.reducer;
 