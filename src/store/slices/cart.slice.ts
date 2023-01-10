import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ICartItem = {
  id: string;
  count: number;
}

interface CartSliceState {
  items: ICartItem[];
}


const initialState: CartSliceState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const { payload } = action;
      const index = state.items.findIndex(item => item.id === payload);
      if (index === -1) {
        state.items.push({ count: 1, id: payload });
      } else {
        state.items[index].count++;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const { payload } = action;
      const index = state.items.findIndex(item => item.id === payload);
      if (index != -1) {
        state.items[index].count--;
      }
      state.items = state.items.filter(item => !!item.count);
    },
    clearCart(state) {
      state.items = [];
    }
  }
})

export default cartSlice;