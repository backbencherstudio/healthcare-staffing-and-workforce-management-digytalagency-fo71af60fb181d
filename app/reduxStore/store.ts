import { configureStore } from "@reduxjs/toolkit";
import sidebarMenuReducer from '@/app/features/sidebar/sidebarMenuSlice'
import navbarSearchSlice from '@/app/features/navbar/navbarSearchSlice'
import rememberMe from '@/app/features/login/rememberme'

const store = configureStore({
    reducer: {
        sidebarMenu: sidebarMenuReducer,
        navbarSearch: navbarSearchSlice,
        rememberMe
    }
})

export default store;