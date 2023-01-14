import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
      // state = action.payload;
      state.info = action.payload.info;
      state.token = action.payload.token;
      state.state = action.payload.state;
      // state.info = { "email": "user@user.ru", "groups": ["d38a8875-0b00-4efd-97ae-fd688ffacebc"], "id": "470f3eaa-6726-4951-a75f-e1b3fba01bd5", "name": "", "nameFill": false, "patronymic": "", "surname": "" }
    },
    logout(state) {
      state.info = undefined;
      state.token = undefined;
      state.state = 'unauth';
    }
  }
})

export default userSlice;