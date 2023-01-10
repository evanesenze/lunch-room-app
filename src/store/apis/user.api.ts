import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { IUserInfo } from '../slices/user.slice';

interface IGetUser {
  userId: string;
  token?: string;
}

interface IUpdateUser {
  userId: string;
  body: {
    surname?: string;
    name?: string;
    patronymic?: string;
  }
}

const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://45.86.183.11:5000/api/User/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: ({ mutation, query }) => ({
    getUser: query<IUserInfo, IGetUser>({
      query: ({ userId, token }) => ({
        url: 'GetUser',
        params: {
          userId
        },
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined
      })
    }),
    updateUser: mutation<IUserInfo, IUpdateUser>({
      query: ({ userId, body }) => ({
        url: 'GetUser',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: {
          userId
        },
        body
      })
    })
  })

});

export const { useLazyGetUserQuery } = userApi;

export default userApi;