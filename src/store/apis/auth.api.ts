import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';

interface IAuth {
  email: string;
  password: string;
}

const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://45.86.183.11:5000/api/Auth/',
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
    })
  })

});

export const { useAuthMutation } = authApi;

export default authApi;