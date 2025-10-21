import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const rememberme= createSlice({
    name:'login',
    initialState,
    reducers:{
        handleRememberMe:(state,action)=>{
            return state = action.payload;
        }
    }
})

export default rememberme.reducer;
export const {handleRememberMe} = rememberme?.actions;