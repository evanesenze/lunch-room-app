import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userApi from "./apis/user.api";
import cartSlice from "./slices/cart.slice";
import userSlice from "./slices/user.slice";
import { setupListeners, } from '@reduxjs/toolkit/query';
import authApi from "./apis/auth.api";
import menuApi from "./apis/menu.api";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist'
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducers = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [menuApi.reducerPath]: menuApi.reducer,
});

export const store = configureStore({
  reducer: persistReducer({ key: 'root', storage: AsyncStorage }, reducers),
  middleware: (getDefault) => getDefault({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER
      ]
    }
  }).concat(userApi.middleware, authApi.middleware, menuApi.middleware)
})

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof reducers>

export type AppDispatch = typeof store.dispatch