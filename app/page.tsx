'use client'

import { CookieHelper } from "@/helper/cookie.helper";
import { UserService } from "@/userservice/user.service";
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function page() {
    const router = useRouter();
    const token = CookieHelper?.get({ key: 'token' });

    const getMe = async () => {
        try {
            const res = await UserService.me();
            if (res?.data?.success) {
                router.replace('/dashboard')
            } else {
                router.replace('/login')
            }
        } catch (err) {
            console.log(err);
            router.replace('/login')
        }
    }

    useEffect(() => {
        if(!token){
            router?.replace('/login');
            return;
        }
        getMe();
    }, [])
    return (
        <div className="w-full h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5B9BF4]"></div>
        </div>
    )
}