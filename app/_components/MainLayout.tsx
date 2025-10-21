'use client'

import React from "react";
import store from "../reduxStore/store";
import { Provider } from "react-redux";

export default function MainLayout({children}:{children:React.ReactNode}){
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}