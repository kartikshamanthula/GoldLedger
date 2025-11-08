import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../Pages/Items/itemSlice";
import itemGroupReducer from "../Pages/Items/itemGroupSlice";
import itemUnitReducer from "../Pages/Items/itemUnitSlice";

export const store = configureStore({
    reducer: {
        items: itemReducer,
        itemGroup : itemGroupReducer,
        itemUnit : itemUnitReducer
    },
});

export default store;