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

interface UserSliceState {
  token?: string;
  info?: IUserInfo

}

const initialState: UserSliceState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<UserSliceState>) {
      // state = action.payload;
      state.info = action.payload.info;
      state.token = action.payload.token;
      // state.info = { "email": "user@user.ru", "groups": ["d38a8875-0b00-4efd-97ae-fd688ffacebc"], "id": "470f3eaa-6726-4951-a75f-e1b3fba01bd5", "name": "", "nameFill": false, "patronymic": "", "surname": "" }
    }
  }
})

export default userSlice;