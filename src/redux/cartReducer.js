import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) =>
          item.id === action.payload.id && item.option === action.payload.option
      );

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) =>
          item.id !== action.payload.id ||
          (item.id === action.payload.id &&
            !_.isEqual(item.options, action.payload.options))
      );
    },
    removeAll: (state, action) => {
      state.products = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, removeAll } = cartSlice.actions;

export default cartSlice.reducer;
