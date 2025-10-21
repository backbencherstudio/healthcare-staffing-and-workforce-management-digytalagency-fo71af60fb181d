import { createSlice } from "@reduxjs/toolkit";

const initialState="/dashbaord";

const sidebarMenuSlice=createSlice({
    name: "sidebar",
    initialState,
    reducers:{
        handleMenuChange:(state,action)=>{
            return state = action.payload
        }
    }
})


export default sidebarMenuSlice?.reducer;
export const {handleMenuChange} = sidebarMenuSlice?.actions;