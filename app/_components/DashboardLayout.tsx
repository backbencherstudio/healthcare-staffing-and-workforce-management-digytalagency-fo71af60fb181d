'use client'

import { Provider } from "react-redux"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { Inter } from '@next/font/google'
import { UserService } from "@/userservice/user.service"
import { useRouter } from "next/navigation";
import { userType } from "./MainLayout"
import { createContext, useContext, useEffect, useState } from "react"
import { CookieHelper } from "@/helper/cookie.helper"


export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

const userContext = createContext<{
    user: userType | null
} | null>(null)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [user, setUser] = useState<userType | null>({
        id: '',
        name: '',
        email: '',
        role: ''
    });
    const [loading, setLoading] = useState(true);
    const getMe = async () => {
        try {
            const res = await UserService.me();
            if (res?.data?.success) {
                router.replace('/dashboard')
                setUser(res?.data?.user)
            } else {
                router.replace('/login')
            }
        } catch (err) {
            console.log(err);
            router.replace('/login')
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        const token = CookieHelper?.get({key:"token"});
        if(!token){
            router?.replace('/login');
            return;
        }
        getMe();
    }, [])

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5B9BF4]"></div>
            </div>
        );
    }
    return (
        <div className={`w-full h-full flex ${inter.variable} font-sans`}>
            <userContext.Provider value={{ user }}>
                <div className="h-full w-fit overflow-y-auto">
                    <Sidebar />
                </div>
                <div className="h-full flex-1 flex flex-col">
                    <div className="h-fit">
                        <Navbar />
                    </div>
                    <div className="flex-1  overflow-y-auto">
                        {children}
                    </div>
                </div>
            </userContext.Provider>
        </div>
    )
}


export function useUserContext() {
    const context = useContext(userContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
}