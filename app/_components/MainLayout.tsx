'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import store from "../reduxStore/store";
import { Provider } from "react-redux";

export interface userType {
    id: string;
    name: string;
    email: string;
    role: string;
    image: string;
}



export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}