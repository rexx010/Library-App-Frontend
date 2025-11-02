import {configureStore} from "@reduxjs/toolkit";
import { authenticationApi } from "../api/authentication";
import { bookControllerApi } from "../api/bookController";
import { reservationApi } from "../api/bookReserve";
import { borrowBookApi } from "../api/borrowBook";


export const store = configureStore({
    reducer:{
        [authenticationApi.reducerPath]: authenticationApi.reducer,
        [bookControllerApi.reducerPath]: bookControllerApi.reducer,
        [reservationApi.reducerPath]: reservationApi.reducer,
        [borrowBookApi.reducerPath]: borrowBookApi.reducer
        
    },
    middleware:(getDefaultMiddleware)=>(getDefaultMiddleware().concat(authenticationApi.middleware, bookControllerApi.middleware, reservationApi.middleware, borrowBookApi.middleware)
)
})