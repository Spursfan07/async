import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DriveEngineResponse, StartOrStopResponse } from '../types/types'

export const engineAPI = createApi({
  reducerPath: 'engine',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ['Engine'],
  endpoints: (build) => ({
    driveCar: build.mutation<DriveEngineResponse, number>({
      query: (id) => ({
        url: `/endine?id=${id}&status=drive`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Engine'],
    }),
    stopCar: build.mutation<StartOrStopResponse, number>({
      query: (id) => ({
        url: `/engine?id=${id}&status=stopped`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Engine'],
    }),
    startCar: build.mutation<StartOrStopResponse, number>({
      query: (id) => ({
        url: `/engine?id=${id}&status=started`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Engine'],
    }),
  }),
})

export const { useDriveCarMutation, useStopCarMutation, useStartCarMutation } =
  engineAPI
