import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { IMenuLunchSet } from './menu.api';

interface OrderOption {
  optionId: string;
  units: number;
}

interface ICreateOrderProps {
  groupId: string;
  customerId: string;
  menuId: string;
  lunchSetId: string;
  lunchSetUnits: number;
  options: OrderOption[];
}

interface IConfirmPaymentProps {
  orderId: string;
}

interface IGetOrdersByUserProps {
  userId: string;
  groupId: string;
}

interface IGetOrderProps {
  orderId: string
}

interface Option2 {
  id: string;
  name: string;
  price: number;
}

interface Option {
  id: string;
  optionId: string;
  optionUnits: number;
  option: Option2;
}

export interface IOrder {
  id: string;
  customerId: string;
  groupId: string;
  orderDate: Date;
  lunchSet: IMenuLunchSet;
  options: Option[];
  payment: boolean;
}

const orderApi = createApi({
  reducerPath: 'order/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://45.86.183.11:5000/api/Orders/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['UserOrders'],
  endpoints: ({ mutation, query }) => ({
    createOrder: mutation<IOrder, ICreateOrderProps>({
      query: (body) => ({
        url: 'CreateOrder',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      }),
      invalidatesTags: ['UserOrders']
    }),
    confirmPayment: mutation<void, IConfirmPaymentProps>({
      query: (params) => ({
        url: 'ConfirmPayment',
        method: 'POST',
        params
      })
    }),
    getOrdersByUser: query<{ date: string, id: string }[], IGetOrdersByUserProps>({
      query: (params) => ({
        url: 'GetOrdersByUser',
        params
      }),
      providesTags: ['UserOrders']
    }),
    getOrder: query<IOrder, IGetOrderProps>({
      query: (params) => ({
        url: 'GetOrder',
        params
      })
    })
  })

});

export const { useCreateOrderMutation, useConfirmPaymentMutation, useGetOrdersByUserQuery, useLazyGetOrderQuery, useGetOrderQuery } = orderApi;

export default orderApi;