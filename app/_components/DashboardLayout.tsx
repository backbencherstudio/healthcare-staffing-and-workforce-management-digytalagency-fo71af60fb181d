'use client'

import { Provider } from "react-redux"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { Inter } from '@next/font/google'


const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`w-full h-full flex ${inter.variable} font-sans`}>

            <div className="h-screen w-fit overflow-y-auto">
                <Sidebar />
            </div>
            <div className="h-screen flex-1 flex flex-col">
                <div className="h-fit">
                    <Navbar />
                </div>
                <div className="flex-1 bg-amber-100 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}