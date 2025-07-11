import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const admissionApi = createApi({
    reducerPath: 'admissionApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8800/api'}),
    endpoints: (builder) =>({
        addAdmission: builder.mutation<any, any>({
            query: (data) =>({
                url: '/admissions',
                method: 'POST',
                body: data,
            })
        }),
        getAdmissions: builder.query<any, string>({
            query: (email) => `/admissions/${email}`
        })
    })
})

export const { useAddAdmissionMutation, useGetAdmissionsQuery } = admissionApi