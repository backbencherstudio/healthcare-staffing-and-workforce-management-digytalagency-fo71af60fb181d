'use client'

import fullLogo from '@/public/SVG/fullLogo.svg'
import Image from 'next/image'
import { Dashbaord, settings, shift, staff, client, logout, payroll } from '@/public/SVG/DashbaordSvg'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { handleMenuChange } from '../features/sidebar/sidebarMenuSlice'
import { UserService } from '@/userservice/user.service';
import { useUserContext } from './DashboardLayout'
import { CookieHelper } from '@/helper/cookie.helper'

const routePaths = [
    {
        id: 1,
        name: 'Dashboard',
        link: '/dashboard',
        Icon: Dashbaord
    },
    {
        id: 2,
        name: 'Staff Management',
        link: '/dashboard/staff_management',
        Icon: staff
    },
    {
        id: 3,
        name: 'Client Management',
        link: '/dashboard/client_management',
        Icon: client
    },
    {
        id: 4,
        name: 'Shift Operations',
        link: '/dashboard/shift_operations',
        Icon: shift
    },
    {
        id: 5,
        name: 'Finance & Payroll',
        link: '/dashboard/finance_payroll',
        Icon: payroll
    }

]

export default function Sidebar() {
    const selectedMenu = useSelector((state: any) => state?.sidebarMenu);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const pathname = usePathname();
    const router = useRouter();
    const {user} =  useUserContext();
    useEffect(() => {
        if (pathname) {
            dispatch(handleMenuChange(pathname))
        }
    }, [pathname, dispatch])


    const handleLogoutModal = () => {
        setIsLogoutOpen(prev => !prev);
    }

    const handleLogout= async()=>{
        setIsLoading(true);
        try{
            const res = await UserService.logout(user?.id || '');
            console.log(res);
            if(res?.data?.success){
                setIsLogoutOpen(false);
                setIsLoading(false);
                router?.replace('/login');
                CookieHelper?.destroy({key:'token'})
            }
        }catch(err){
            console.log(err);
            setIsLogoutOpen(false);
        }
    }

    return (
        <div className="px-6 py-[30px] flex flex-col justify-between h-screen bg-[#E8F1FD]">
            <div className='space-y-[32px]'>
                <div>
                    <Image src={fullLogo} alt='Logo' width={500} height={500} className='w-[232px]' />
                </div>
                <div className='space-y-[10px]'>
                    {routePaths?.map(item =>
                        <Link href={item?.link} key={item?.id} className={`flex items-center gap-4 px-5 py-3 rounded-md duration-300 leading-[24px] capitalize ${item?.link === selectedMenu ? "bg-[#5B9BF4] text-white font-medium" : "text-[#28303F] hover:bg-[#deeaf8]"}`}>
                            <span>
                                {item?.Icon}
                            </span>
                            <span className={`${item?.link === selectedMenu ? "text-white" : "text-[#16151C] "}`}>{item?.name}</span>
                        </Link>
                    )}
                </div>
            </div>
            <div className='space-y-[10px]'>
                <Link href='/dashboard/settings' className={`flex items-center gap-4 px-5 py-3 rounded-md duration-300 leading-[24px] capitalize ${selectedMenu === "/dashboard/settings" ? "bg-[#5B9BF4] text-white font-medium" : "text-[#28303F] hover:bg-[#deeaf8]"}`}>
                    <span>
                        {settings}
                    </span>
                    <span className={`${selectedMenu === '/dashboard/settings' ? "text-white" : "text-[#16151C] "}`}>Settings</span>
                </Link>
                <button type='button' onClick={handleLogoutModal} className={`flex items-center w-full cursor-pointer gap-4 px-5 py-3 rounded-md duration-300 leading-[24px] capitalize ${selectedMenu === '/logout' ? "bg-[#5B9BF4] text-white font-medium" : "text-[#28303F] hover:bg-[#deeaf8]"}`}>
                    <span>
                        {logout}
                    </span>
                    <span className={`${selectedMenu === '/logout' ? "text-white" : "text-[#16151C] "}`}>Logout</span>
                </button>
            </div>
            {isLogoutOpen&&<div className='fixed inset-0 bg-[#0000002f] backdrop-blur-sm flex items-center justify-center' onClick={handleLogoutModal}>
                <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 transform transition-all py-6 space-y-6" onClick={(e)=>e.stopPropagation()}>
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
                            disabled={isLoading}
                            className="flex-1 px-3 py-2 text-gray-700 bg-white border border-[#5B9BF4] cursor-pointer rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLogout}
                            disabled={isLoading}
                            className="flex-1 px-3 py-2 text-white bg-red-600 rounded-lg cursor-pointer hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            {isLoading?"Logingout...":"Logout"}
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    )
}