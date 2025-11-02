import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_BASE_URL3

export const reservationApi = createApi({
    reducerPath: "reservationApi",
    baseQuery:fetchBaseQuery({baseUrl:URL, credentials:"include"}),
    tagTypes: ["Books"],
    endpoints:(builder)=>({
        postReserveBook: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "POST",
                body: id,
            }),
            invalidatesTags: ["Books"],
        }),
        postCancelReservation: builder.mutation({
            query: (id) => ({
                url: `/cancel/${id}`,
                method: "POST",
                body: id,
            }),
            invalidatesTags: ["Books"],
        }),
        getReservationsByUser: builder.query({
            query: () => ({
                url: `/reserved`,
                method: "GET",
            }),
            providesTags: ["Books"],
        }),
    })
})

export const { usePostReserveBookMutation, usePostCancelReservationMutation, useGetReservationsByUserQuery } = reservationApi