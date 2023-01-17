import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userApi from "./apis/user.api";
import cartSlice from "./slices/cart.slice";
import userSlice from "./slices/user.slice";
import { setupListeners, } from '@reduxjs/toolkit/query';
import authApi from "./apis/auth.api";
import menuApi from "./apis/menu.api";
import orderApi from "./apis/order.api";


export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer
  },
  middleware: (getDefault) => getDefault().concat(userApi.middleware, authApi.middleware, menuApi.middleware, orderApi.middleware)
})


setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch