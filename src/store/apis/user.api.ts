import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { IUserInfo } from '../slices/user.slice';
import { API_URL } from '@env';

export interface IGetUser {
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
    baseUrl: `${API_URL}/User/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: ({ mutation, query }) => ({
    getUser: query<IUserInfo, IGetUser>({
      query: ({ userId, token }) => ({
        url: 'GetUser',
        params: {
          userId
        },
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined
      }),
      providesTags: ['User']
    }),
    updateUser: mutation<IUserInfo, IUpdateUser>({
      query: ({ userId, body }) => {
        console.log(body);
        console.log(userId);
        return ({
          url: 'UpdateUser',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          params: {
            userId
          },
          body
        })
      },
      invalidatesTags: ['User']
    })
  })

});

export const { useLazyGetUserQuery, useUpdateUserMutation } = userApi;

export default userApi;