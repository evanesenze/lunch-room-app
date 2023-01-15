import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMenuLunchSet } from '../apis/menu.api';

export type ICartItem = {
  item: IMenuLunchSet;
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
    addToCart(state, action: PayloadAction<IMenuLunchSet>) {
      const { payload } = action;
      const index = state.items.findIndex(item => item.item.id === payload.id);
      if (index === -1) {
        state.items = [];
        state.items.push({ count: 1, item: payload });
      } else {
        state.items[index].count++;
      }
    },
    removeFromCart(state, action: PayloadAction<IMenuLunchSet>) {
      const { payload } = action;
      const index = state.items.findIndex(item => item.item.id === payload.id);
      if (index != -1) {
        state.items[index].count--;
      }
      state.items = state.items.filter(item => !!item.count);
    },
    removeAllFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    }
  }
})

export default cartSlice;