import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  endpoints: builder => ({})

});

export default userApi;