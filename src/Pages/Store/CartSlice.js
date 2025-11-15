import { createSlice } from "@reduxjs/toolkit";


const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: savedCart,
    },

    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existing = state.items.find(i => i.id === item.id);

            if (existing) {
                existing.pieces = item.pieces;
            } else {
                state.items.push({
                    ...item,
                    pieces: item.pieces ?? 0,
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },


        removeFromCart(state, action) {
            const id = action.payload;
            state.items = state.items.filter(i => i.id !== id);
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        increaseQty(state, action) {
            const id = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item) {
                item.pieces = (item.pieces || 0) + 1;
                localStorage.setItem("cartItems", JSON.stringify(state.items));
            }
        },

        decreaseQty(state, action) {
            const id = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item) {
                item.pieces = (item.pieces || 0) - 1;

                if (item.pieces <= 0) {
                    state.items = state.items.filter(i => i.id !== id);
                }
                localStorage.setItem("cartItems", JSON.stringify(state.items));
            }
        },

        clearCart(state) {
            state.items = [];
            localStorage.setItem("cartItems", JSON.stringify([]));
        },
    },
});


export const {
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
