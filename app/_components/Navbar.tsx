import { notificationBell } from "@/public/SVG/DashbaordSvg"
import { searchIcon } from "@/public/SVG/DashbaordSvg"
import avatar from '@/public/Images/avatar.png'
import Image from "next/image"
import { Lexend } from 'next/font/google'
import { Roboto } from 'next/font/google'
import { useDispatch, useSelector } from "react-redux"
import { handleSearchValue } from "../features/navbar/navbarSearchSlice";
import toast, { Toaster } from "react-hot-toast"

const lexend = Lexend({
    subsets: ['latin'],
    variable: '--font-lexend',
    // Optional: specify weights you need
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    // Optional: specify display
    display: 'swap',
})

const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
})

export default function Navbar() {
    const searchText = useSelector((state: any) => state?.navbarSearch);
    const dispatch = useDispatch();
    const handleSearchChange = (value: string) => {
        dispatch(handleSearchValue(value))
    }
    const handleSearch = () => {
        toast.success(searchText);
        dispatch(handleSearchValue(''));
    }
    return (
        <div className="flex w-full justify-between px-6 py-3 bg-white border-b border-[#CFD2D2]">
            <Toaster position="top-right" />
            <div>
                <div className="flex items-center gap-[2px]">
                    <h3 className={`text-[#16151C] text-xl font-semibold leading-[30px] ${lexend.variable} font-sans`}>Hello, Mathias</h3>
                    <span>👋🏻</span>
                </div>
                <span className="text-[#A2A1A8] leading-[24px]">Good Morning</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex items-center bg-[#E8F1FD] px-5 py-4 rounded-lg gap-1">
                    <button type="button" onClick={handleSearch} className="cursor-pointer">
                        {searchIcon}
                    </button>
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Start typing..."
                        className="text-[#5B5F5F] border-none outline-none"
                    />
                </div>
                <button type="button" className="p-4 bg-[#E8F1FD] rounded-[10px] cursor-pointer">
                    {notificationBell}
                </button>
                <div className="flex items-center gap-3 cursor-default select-none">
                    <div className="rounded-lg">
                        <Image src={avatar} alt="profile image" width={500} height={500} className="w-[48px] h-[48px] object-cover rounded-lg" />
                    </div>
                    <div>
                        <h3 className={`text-[#16151C] text-xl font-semibold leading-[30px] capitalize ${roboto.variable} font-sans`}>Mathias W.</h3>
                        <h2 className="text-[#A2A1A8] text-sm  leading-[22.4px] capitalize">Store Manager</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}