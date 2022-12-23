import { createSlice } from '@reduxjs/toolkit';

interface UserSliceState { }

const initialState: UserSliceState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
})

export default userSlice;