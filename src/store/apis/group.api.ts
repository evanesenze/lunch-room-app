import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { IGroup } from '../slices/group.slice';
import { API_URL } from '@env';

interface IAddGroupMemberProps {
  userId: string;
  groupId: string
}

interface IGetGroupProps {
  groupId: string
}

const groupApi = createApi({
  reducerPath: 'group/api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/Group/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: ({ mutation, query }) => ({
    addGroupMember: mutation<void, IAddGroupMemberProps>({
      query: (props) => ({
        url: 'AddUser',
        method: 'POST',
        props
      })
    }),
    getGroup: query<IGroup, IGetGroupProps>({
      query: (params) => ({
        url: 'GetGroup',
        params
      })
    })
  })

});

export const { useAddGroupMemberMutation, useLazyGetGroupQuery } = groupApi;

export default groupApi;