import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8800/api" }),
    endpoints: (builder) => ({
        addReview: builder.mutation<any, any>({
            query: (data) => ({
                url: "/reviews",
                method: "POST",
                body: data,
            })
        }),
        getReviews: builder.query<any[], void>({
            query: () => "/reviews"
        })
    })
})

export const { useAddReviewMutation, useGetReviewsQuery } = reviewApi