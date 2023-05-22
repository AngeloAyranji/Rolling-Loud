import { createSlice } from "@reduxjs/toolkit";

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
            item.optionId !== action.payload.optionId)
      );
    },
    removeAll: (state, action) => {
      state.products = [];
    },
    updateQuantity: (state, action) => {
      state.products = state.products.map((item) => {
        if (action.payload.optionId === item.optionId) {
          item.quantity = action.payload.quantity;
        }
        return item;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, removeAll, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
