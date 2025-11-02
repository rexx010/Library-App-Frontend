import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_BASE_URL

export const borrowBookApi = createApi({
    reducerPath: "borrowBook",
    baseQuery:fetchBaseQuery({baseUrl:URL, credentials:"include"}),
    tagTypes: ["Books"],
    endpoints:(builder)=>({
        
        postBorrowBook: builder.mutation({
            query: (id) => ({
                url: `/borrow-books/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Books"],
        }),

        getBorrowedBooks: builder.query({
            query:()=> ({
                url: "/borrow-books/borrowed",
                method: "GET",
            }),
            providesTags: ["Books"],
        }),

        returnBook: builder.mutation({
            query: (id) => ({
                url: `/borrow-books/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["Books"],
        }),

        deleteBorrowedBookById: builder.mutation({
            query: (bookId) => ({
                url: `/borrow-books/${bookId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Books"],
        }),

    })
})

export const { usePostBorrowBookMutation, useGetBorrowedBooksQuery, useReturnBookMutation, useDeleteBorrowedBookByIdMutation } = borrowBookApi