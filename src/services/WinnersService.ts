import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Winner } from '../types/types'

export const winnersAPI = createApi({
  reducerPath: 'winners',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ['Winners'],
  endpoints: (build) => ({
    getWinners: build.query<
      Winner[],
      {
        page?: number
        limit?: number
        sort?: 'id' | 'wins' | 'time'
        order?: 'ASC' | 'DESC'
      }
    >({
      query: ({ page = 1, limit = 7, sort = 'wins', order = 'desc' }) => ({
        url: '/winners',
        params: {
          _page: page,
          _limit: limit,
          _sort: sort,
          _order: order,
        },
        method: 'GET',
      }),
      providesTags: ['Winners'],
    }),
    getWinner: build.query<Winner, number>({
      query: (id) => ({
        url: `/winners/${id}`,
        params: {
          id,
        },
      }),
      providesTags: ['Winners'],
    }),
    createWinner: build.mutation<Winner, Winner>({
      query: (data) => ({
        url: '/winners',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Winners'],
    }),
    updateWinner: build.mutation<Winner, Winner>({
      query: (data) => ({
        url: `/winners/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Winners'],
    }),
    deleteWinner: build.mutation<Winner, number>({
      query: (id) => ({
        url: `/winners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Winners'],
    }),
  }),
})

export const {
  useCreateWinnerMutation,
  useGetWinnersQuery,
  useGetWinnerQuery,
  useUpdateWinnerMutation,
  useDeleteWinnerMutation,
  useLazyGetWinnerQuery,
} = winnersAPI
