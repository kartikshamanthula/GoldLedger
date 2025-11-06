import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../Pages/Items/itemSlice";

export const store = configureStore({
    reducer: {
        items: itemReducer     
    },
});

export default store;