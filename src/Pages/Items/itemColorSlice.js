import {createSlice, nanoid} from "@reduxjs/toolkit";

const savedcolors = JSON.parse(localStorage.getItem("itemcolorData")) || [];
const storedFilters = JSON.parse(localStorage.getItem("itemcolorfilters")) || {};

const initialState = {
    data : savedcolors,
    loading : false,
    error : null,
    filters : storedFilters,
};

const itemColorSlice = createSlice ({

    name: "itemcolor",
    initialState,
    reducers: {

        startLoading(state) {
            state.loading = true;
        },

        loaditemcolorSuccess(state, action){
            state.data = action.payload;
            state.loading = false;
            localStorage.setItem("itemcolorData", JSON.stringify(state.data));
        },

        addColor(state,action){
            state.data.push({id : nanoid(), ...action.payload});
            localStorage.setItem("itemcolorData", JSON.stringify(state.data));
        },

        updateColor(state, action){
            const {id , updatedData} = action.payload;
            const index = state.data.findIndex((color) => color.id === id);
            if(index !== -1){
                state.data[index] = {...state.data[index], ...updatedData};
                localStorage.setItem("itemcolorData", JSON.stringify(state.data));
            }
        },

        deleteColor(state, action){
            state.data = state.data.filter((color) => color.id !== action.payload);
            localStorage.setItem("itemcolorData", JSON.stringify(state.data));
        },

        setFilters(state){
            state.filters = action.payload;
            localStorage.setItem("itemcolorfilters", JSON.stringify(state.filters));
        },

        clearFilters(state){
            state.filters = {};
            localStorage.removeItem("itemcolorfilters");
        },

        setError(state, action){
            state.error = action.payload;
            state.loading = false;
        }


    }

})

export const {
    startLoading, 
    loaditemcolorSuccess, 
    addColor, 
    updateColor, 
    deleteColor, 
    setError, 
    setFilters, 
    clearFilters} = itemColorSlice.actions;
export default itemColorSlice.reducer;