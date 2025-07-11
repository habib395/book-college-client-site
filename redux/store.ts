import { configureStore } from '@reduxjs/toolkit'
import { collegesApi } from "./collegeApi"
import { admissionApi } from "./admissionApi"
import { reviewApi } from './reviewApi'

export const store = configureStore({
    reducer: {
        [collegesApi.reducerPath]: collegesApi.reducer,
        [admissionApi.reducerPath]: admissionApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(collegesApi.middleware, admissionApi.middleware, reviewApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch