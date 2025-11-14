import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../Pages/Items/itemSlice";
import itemGroupReducer from "../Pages/Items/itemGroupSlice";
import itemUnitReducer from "../Pages/Items/itemUnitSlice";
import itemColorReducer from "../Pages/Items/itemColorSlice";
import itemDesignReducer from "../Pages/Items/itemDesignSlice";
import cartReducer from "../Pages/Store/CartSlice";

export const store = configureStore({
    reducer: {
        items: itemReducer,
        itemGroup : itemGroupReducer,
        itemUnit : itemUnitReducer,
        itemColor : itemColorReducer,
        itemDesign : itemDesignReducer,
        cart: cartReducer,
    },
});

export default store;