import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const navbarSearchSlice = createSlice({
    name: "navbar",
    initialState,
    reducers:{
        handleSearchValue:(state,action)=>{
            return state = action?.payload;
        }
    }
})

export default navbarSearchSlice?.reducer;
export const {handleSearchValue} = navbarSearchSlice?.actions;