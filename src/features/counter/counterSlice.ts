import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  value: number;
}

const initialState: CartState = {
  value: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartCount: (state) => {
      const cartCounter = document.querySelector(".cart-count");

      cartCounter.innerHTML = `${state}`;
    },
  },
});

export const { updateCartCount } = cartSlice.actions;
export default cartSlice.reducer;
