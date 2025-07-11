import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const collegesApi = createApi({
    reducerPath: 'collegesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8800/api'}),
    endpoints: (builder) => ({
        getCollegeById: builder.query<any, string>({
            query: (id) => `/colleges/${id}`
        }),
        getColleges: builder.query<any[], void>({
            query: () => '/colleges',
        })
        
    })
})

export const { useGetCollegesQuery, useGetCollegeByIdQuery } = collegesApi 