import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promoCode: null,
};

export const cartSlice = createSlice({
  name: "promoCode",
  initialState,
  reducers: {
    addPromo: (state, action) => {
      state.promoCode = action.payload;
    },
    removePromo: (state) => {
      state.promoCode = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPromo, removePromo } = cartSlice.actions;

export default cartSlice.reducer;
