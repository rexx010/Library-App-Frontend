import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_BASE_URL

export const authenticationApi = createApi({
    reducerPath: "authenticationApi",
    baseQuery:fetchBaseQuery({baseUrl:URL, credentials:"include"}),
    endpoints:(builder)=>({
        postRegisterRequest: builder.mutation({
            query: (bodyData) => ({
                url: "/auth/register",
                method: "POST",
                body: bodyData,
            }),
        }),
        postLoginRequest: builder.mutation({
            query: (bodyData) => ({
                url: "/auth/login",
                method: "POST",
                body: bodyData,
            }),
        }),
        getCurrentUser: builder.query({
            query: () => ({
                url: "/auth/me",
                method: "GET",
            }),
        }),
        postLogoutUserRequest: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
        }),
    })
})



export const {usePostRegisterRequestMutation, usePostLoginRequestMutation, useGetCurrentUserQuery, usePostLogoutUserRequestMutation} = authenticationApi