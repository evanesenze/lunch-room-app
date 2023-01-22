import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import userApi, { IGetUser } from '../apis/user.api';

const { getUser } = userApi.endpoints;

export interface IUserInfo {
  id: string;
  surname: string;
  name: string;
  patronymic: string;
  email: string;
  nameFill: boolean;
  groups: string[];
}

type UserState = 'wait' | 'auth' | 'unauth';

interface UserSliceState {
  state: UserState;
  token?: string;
  info?: IUserInfo
}

const initialState: UserSliceState = {
  state: 'wait'
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<UserSliceState>) {
      state.info = action.payload.info;
      state.token = action.payload.token;
      state.state = action.payload.state;
    },
    logout(state) {
      state.info = undefined;
      state.token = undefined;
      state.state = 'unauth';
    }
  }
})

export default userSlice;