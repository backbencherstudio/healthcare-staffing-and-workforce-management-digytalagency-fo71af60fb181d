import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isLogoutOpen: false
};

const sidebarLogoutSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        handleLogoutChange: (state, action) => {
            state.isLogoutOpen = action.payload;
        },
        handleSidebarLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

// Correct exports
export const { handleLogoutChange, handleSidebarLoading } = sidebarLogoutSlice.actions;
export default sidebarLogoutSlice.reducer;