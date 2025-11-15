import { createSlice, nanoid } from "@reduxjs/toolkit";

const savedDesigns = JSON.parse(localStorage.getItem("itemDesignData")) || [];
const savedFilters = JSON.parse(localStorage.getItem("itemDesignFilters")) || {};

const initialState = {
    data: savedDesigns,
    loading: false,
    error: null,
    filters: savedFilters,
};

const itemDesignSlice = createSlice({
    name: "itemDesign",
    initialState,
    reducers: {
        startLoading(state) {
            state.loading = true;
        },

        loadItemDesignSuccess(state, action) {
            state.data = action.payload;
            state.loading = false;
            localStorage.setItem("itemDesignData", JSON.stringify(state.data));
        },

        addDesign(state, action) {
            state.data.push({
                id: nanoid(),
                isFavorite: false,   
                pieces: 1,           
                ...action.payload
            });

            localStorage.setItem("itemDesignData", JSON.stringify(state.data));
        },

        updateDesign(state, action) {
            const { id, updatedData } = action.payload;
            const index = state.data.findIndex((design) => design.id === id);
            if (index !== -1) {
                state.data[index] = { ...state.data[index], ...updatedData };
                localStorage.setItem("itemDesignData", JSON.stringify(state.data));
            }
        },

        deleteDesign(state, action) {
            state.data = state.data.filter((design) => design.id !== action.payload);
            localStorage.setItem("itemDesignData", JSON.stringify(state.data));
        },

        setFilters(state, action) {
            state.filters = action.payload;
            localStorage.setItem("itemDesignFilters", JSON.stringify(state.filters));
        },

        clearFilters(state) {
            state.filters = {};
            localStorage.removeItem("itemDesignFilters");
        },

        setError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    loadItemDesignSuccess,
    startLoading,
    addDesign,
    updateDesign,
    deleteDesign,
    setError,
    setFilters,
    clearFilters,
    addToCart
} = itemDesignSlice.actions;

export default itemDesignSlice.reducer;
