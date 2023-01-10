import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';

interface IGetTodayMenu {
  groupId: string;
}

export interface IMenuLunchSet {
  id: string;
  price: number;
  lunchSetList: string[];
}

export interface IMenuOption {
  id: string;
  name: string;
  price: number;
}

export interface IMenu {
  id: string;
  date: Date;
  lunchSets: IMenuLunchSet[];
  options: IMenuOption[];
}

const menuApi = createApi({
  reducerPath: 'menu/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://45.86.183.11:5000/api/Menu/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: ({ mutation, query }) => ({
    getTodayMenu: query<IMenu, IGetTodayMenu>({
      query: ({ groupId }) => ({
        url: 'GetTodayMenu',
        params: { groupId }
      })
    })
  })

});

export const { useGetTodayMenuQuery, useLazyGetTodayMenuQuery } = menuApi;

export default menuApi;