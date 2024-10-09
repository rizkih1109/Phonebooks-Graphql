import { configureStore } from "@reduxjs/toolkit";
import phoneReducer from "./lib/phonebooks/phonebooksSlice"

export const store = configureStore({
    reducer: {
        phone: phoneReducer
    }
})