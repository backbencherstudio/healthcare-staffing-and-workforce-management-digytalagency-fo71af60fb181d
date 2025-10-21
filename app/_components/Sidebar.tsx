'use client'

import fullLogo from '@/public/SVG/fullLogo.svg'
import Image from 'next/image'
import { Dashbaord, settings, shift, staff, client, logout, payroll } from '@/public/SVG/DashbaordSvg'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { handleMenuChange } from '../features/sidebar/sidebarMenuSlice'

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
    const selectedMenu = useSelector((state: any) => state?.sidebarMenu)
    const dispatch = useDispatch();
    const pathname = usePathname();
    useEffect(() => {
        if (pathname) {
            dispatch(handleMenuChange(pathname))
        }
    }, [pathname,dispatch])
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
                <button type='button' className={`flex items-center w-full cursor-pointer gap-4 px-5 py-3 rounded-md duration-300 leading-[24px] capitalize ${selectedMenu === '/logout' ? "bg-[#5B9BF4] text-white font-medium" : "text-[#28303F] hover:bg-[#deeaf8]"}`}>
                    <span>
                        {logout}
                    </span>
                    <span className={`${selectedMenu === '/logout' ? "text-white" : "text-[#16151C] "}`}>Logout</span>
                </button>
            </div>
        </div>
    )
}