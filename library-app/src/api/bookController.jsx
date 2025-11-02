import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_BASE_URL2

export const bookControllerApi = createApi({
    reducerPath: "books",
    baseQuery:fetchBaseQuery({baseUrl:URL, credentials:"include"}),
    tagTypes: ["Books"],
    endpoints:(builder)=>({
        postAddBook: builder.mutation({
            query: (bodyData) => ({
                url: "/add-book",
                method: "POST",
                body: bodyData,
            }),
            invalidatesTags: ["Books"],
        }),
        getAllBooks: builder.query({
            query: () => ({
                url: "",
                method: "GET",
            }),
            providesTags: ["Books"],
        }),
        getbook: builder.query({
            query: (id)=>({
                url: `/${id}`,
                method: "GET",
            }),
            providesTags: ["Books"],
        }),
        deleteBookById: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Books"],
        }),
        updateBook: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/books/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Books"],
        }),

    })
})

export const { usePostAddBookMutation, useGetAllBooksQuery, useGetbookQuery, useDeleteBookByIdMutation, useUpdateBookMutation } = bookControllerApi