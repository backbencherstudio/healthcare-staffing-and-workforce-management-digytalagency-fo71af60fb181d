'use client'

import { Provider, useDispatch, useSelector } from "react-redux"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { Inter } from '@next/font/google'
import { UserService } from "@/userservice/user.service"
import { useRouter } from "next/navigation";
import { userType } from "./MainLayout"
import { createContext, useContext, useEffect, useState } from "react"
import { CookieHelper } from "@/helper/cookie.helper"
import { logout } from "@/public/SVG/DashbaordSvg"
import { handleLogoutChange } from "../features/sidebar/sidebarLogoutSlice"


export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
})

const userContext = createContext<{
    user: userType | null;
    isSidebarOpen: boolean;
    handleSidebar: () => void;
    showSearchBar: boolean;
    handleShowSearch: () => void;
} | null>(null)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [user, setUser] = useState<userType | null>({
        id: '',
        name: '',
        email: '',
        role: '',
        image: ''
    });
    const logoutInfo = useSelector((state: any) => state?.sidebarLogoutSlice)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const dispatch = useDispatch();
    const getMe = async () => {
        try {
            const res = await UserService.me();
            console.log(res);
            if (res?.statusText === "OK") {
                // router.replace('/dashboard')
                setUser(res?.data)
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
        // if(!token){
        //     router?.replace('/login');
        //     return;
        // }
        getMe();
        // router.replace('/dashboard')
        setLoading(false);
    }, [])

    const handleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    }

    const handleShowSearch = () => {
        setShowSearchBar(prev => !prev);
    }

    const handleLogout = async () => {
        dispatch(handleLogoutChange(!logoutInfo?.isLogoutOpen))
        dispatch(handleLogoutChange(!logoutInfo?.isLoading))
        router?.replace('/login');
        CookieHelper?.destroy({ key: 'token' })
    }

    const handleLogoutModal = () => {
        dispatch(handleLogoutChange(!logoutInfo?.isLogoutOpen))
    }

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5B9BF4]"></div>
            </div>
        );
    }
    return (
        <div className={`w-full h-full flex ${inter.variable} font-sans relative`}>
            <userContext.Provider value={{
                user,
                isSidebarOpen,
                handleSidebar,
                handleShowSearch,
                showSearchBar
            }}>
                <div className={`h-full z-99 ${isSidebarOpen ? "inset-0 xl:w-fit bg-[#00000031] xl:bg-transparent backdrop-blur-sm xl:backdrop-blur-none" : "w-fit"} absolute xl:static ${isSidebarOpen ? "translate-x-0" : "-translate-x-74 xl:translate-x-0"}  duration-300`} onClick={handleSidebar}>
                    <Sidebar />
                </div>
                <div className="h-full flex-1 flex flex-col">
                    <div className="h-fit">
                        <Navbar />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {children}
                    </div>
                </div>
            </userContext.Provider>
            {logoutInfo?.isLogoutOpen && <div className='fixed inset-0 bg-[#0000002f] backdrop-blur-sm flex items-center justify-center z-999' onClick={handleLogoutModal}>
                <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 transform transition-all py-6 space-y-6" onClick={(e) => e.stopPropagation()}>
                    <div className="px-6">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 bg-[#E8F1FD] rounded-full flex items-center justify-center">
                                {logout}
                            </div>
                        </div>
                        <p className="text-center text-gray-600 mb-2">
                            Are you sure you want to logout?
                        </p>
                        <p className="text-center text-sm text-gray-500">
                            You&apos;ll need to login again to
                        </p>
                        <p className="text-center text-sm text-gray-500">
                            access your account.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="flex space-x-3 px-6">
                        <button
                            onClick={handleLogoutModal}
                            disabled={logoutInfo.isLoading}
                            className="flex-1 px-3 py-2 text-gray-700 bg-white border border-[#5B9BF4] cursor-pointer rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLogout}
                            disabled={logoutInfo.isLoading}
                            className="flex-1 px-3 py-2 text-white bg-red-600 rounded-lg cursor-pointer hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            {logoutInfo.isLoading ? "Logingout..." : "Logout"}
                        </button>
                    </div>
                </div>
            </div>}
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