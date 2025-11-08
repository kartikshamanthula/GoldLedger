import {createSlice, nanoid} from "@reduxjs/toolkit";

const savedunits = JSON.parse(localStorage.getItem("itemUnitData")) || [];
const storedFilters =JSON.parse(localStorage.getItem("itemUnitFilters"));

const initialState = {
    data : savedunits,
    loading : false,
    error : null,
    Filters : storedFilters,
};

const itemUnitSlice = createSlice({
    name : "itemUnit",
    initialState,
    reducers : {
        startLoading(state){
            state.loading = true;
        },
        loadItemUnitSuccess(state,action){
            state.data = action.payload;
            state.loading = false;
            localStorage.setItem("itemUnitData", JSON.stringify(state.data));
        },
        addUnit(state,action){
            state.data.push({id : nanoid(), ...action.payload});
            localStorage.setItem("itemUnitData", JSON.stringify(state.data));
        },
        updateUnit(state,action){
            const {id, updatedData} = action.payload;
            const index = state.data.findindex((unit) => unit.id === id);
            if(index !== -1){
                state.data[index] = {...state.data[index], ...updatedData};
                localStorage.setItem("itemUnitData", JSON.stringify(state.data));
            }
        },
        deleteUnit(state,action){
            state.data = state.data.filters((unit) => unit.id !== action.payload);
            localStorage.setItem("itemUnitData", JSON.stringify(state.unit));
        },
        setFilters(state,action){
            state.Filters = action.payload;
            localStorage.setItem("itemUnitFilters", JSON.stringify(state.Filters));
        },
        clearFilters(state){
            state.Filters = {};
            localStorage.removeItem("itemunitFilters");
        },
        setError(state,action){
            state.error = action.payload;
            state.loading = false;

        }
    }
})

export const {
    startLoading,
    loadItemUnitSuccess,
    addUnit,
    updateUnit,
    deleteUnit,
    setError,
    setFilters,
    clearFilters,
} = itemUnitSlice.actions;

export default itemUnitSlice.reducer;