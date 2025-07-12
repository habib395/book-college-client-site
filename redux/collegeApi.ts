import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const collegesApi = createApi({
    reducerPath: 'collegesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8800/api'}),
    endpoints: (builder) => ({
        getColleges: builder.query<any[], void>({
            query: () => '/colleges',
        }),
        getCollegeById: builder.query<any, string>({
            query: (id) => `/colleges/${id}`
        }),
    })
})

export const { useGetCollegesQuery, useGetCollegeByIdQuery } = collegesApi 