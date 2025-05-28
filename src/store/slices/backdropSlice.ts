import { createSlice } from "@reduxjs/toolkit";

const initialState: { isOpen: boolean } = {
  isOpen: false,
};

const backdropSlice = createSlice({
  name: "backdrop",
  initialState,
  reducers: {
    openBackdrop: (state) => {
      state.isOpen = true;
    },
    closeBackdrop: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openBackdrop, closeBackdrop } = backdropSlice.actions;
export default backdropSlice.reducer;
