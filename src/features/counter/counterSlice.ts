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
    updateCartCount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { updateCartCount } = cartSlice.actions;
export default cartSlice.reducer;
