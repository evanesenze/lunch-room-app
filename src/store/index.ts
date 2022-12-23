import { configureStore } from "@reduxjs/toolkit";
import userApi from "./apis/user.api";
import cartSlice from "./slices/cart.slice";
import userSlice from "./slices/user.slice";
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefault) => getDefault().concat(userApi.middleware)
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch