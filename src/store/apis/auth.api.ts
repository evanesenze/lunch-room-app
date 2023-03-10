import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { API_URL } from '@env';

interface IAuth {
  email: string;
  password: string;
}

const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/Auth/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: ({ mutation, query }) => ({
    auth: mutation<string, IAuth>({
      query: (body) => ({
        url: 'Auth',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      })
    }),
    register: mutation<string, IAuth>({
      query: (body) => ({
        url: 'RegisterUser',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      })
    })
  })

});

export const { useAuthMutation, useRegisterMutation } = authApi;

export default authApi;