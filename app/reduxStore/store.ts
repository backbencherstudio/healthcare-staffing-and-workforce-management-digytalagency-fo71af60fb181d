import { configureStore } from "@reduxjs/toolkit";
import sidebarMenuReducer from '@/app/features/sidebar/sidebarMenuSlice'
import sidebarLogoutSlice from '@/app/features/sidebar/sidebarLogoutSlice'
import navbarSearchSlice from '@/app/features/navbar/navbarSearchSlice'
import rememberMe from '@/app/features/login/rememberme';

const store = configureStore({
    reducer: {
        sidebarMenu: sidebarMenuReducer,
        navbarSearch: navbarSearchSlice,
        rememberMe,
        sidebarLogoutSlice
    }
})

export default store;