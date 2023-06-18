import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingProductIndex = state.cart.findIndex(
        (item) => item.productId === productId
      );

      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity += quantity;
      } else {
        state.cart.push({ productId, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      state.cart = state.cart.filter((item) => item.productId !== productId);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const productIndex = state.cart.findIndex(
        (item) => item.productId === productId
      );

      if (productIndex !== -1) {
        state.cart[productIndex].quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } =
  managerSlice.actions;

export default managerSlice.reducer;
