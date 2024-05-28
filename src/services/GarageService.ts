import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Car } from '../types/types'

interface GetCarsQueryParams {
  page?: number
  limit?: number
}

interface GetCarsResponse {
  cars: Car[]
  totalCount: number
}

export const garageAPI = createApi({
  reducerPath: 'garage',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ['Garage'],
  endpoints: (build) => ({
    getCars: build.query<GetCarsResponse, GetCarsQueryParams>({
      query: ({ page = 1, limit = 7 }) => ({
        url: '/garage',
        params: {
          _page: page,
          _limit: limit,
        },
      }),
      transformResponse: (response: Car[], meta) => {
        const totalCount = parseInt(
          meta?.response?.headers.get('X-Total-Count') || '0',
          10
        )
        return { cars: response, totalCount }
      },
      providesTags: ['Garage'],
    }),
    getCar: build.query<Car, number>({
      query: (id) => ({
        url: `/garage/${id}`,
        params: {
          id,
        },
      }),
      providesTags: ['Garage'],
    }),
    createCar: build.mutation<Car, Car>({
      query: (car: Car) => ({
        url: '/garage',
        method: 'POST',
        body: car,
      }),
      invalidatesTags: ['Garage'],
    }),
    deleteCar: build.mutation<void, number>({
      query: (id) => ({
        url: `/garage/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Garage'],
    }),
    updateCar: build.mutation<Car, { car: Car; id: number }>({
      query: ({ car, id }) => ({
        url: `/garage/${id}`,
        method: 'PUT',
        body: car,
      }),
      invalidatesTags: ['Garage'],
    }),
  }),
})

export const {
  useGetCarsQuery,
  useGetCarQuery,
  useCreateCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation,
} = garageAPI
