import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { bindActionCreators } from '@reduxjs/toolkit';
import { RootState } from "../store";
import userSlice from "../store/slices/user.slice";
import cartSlice from "../store/slices/cart.slice";

const actions = {
  ...userSlice.actions,
  ...cartSlice.actions
};

export const useAppActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;