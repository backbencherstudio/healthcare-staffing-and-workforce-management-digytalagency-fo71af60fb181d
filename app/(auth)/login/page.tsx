'use client'

import logo from '@/public/SVG/logo.svg'
import Image from 'next/image'
import { useForm } from 'react-hook-form' // Correct named import
import { ticmark } from '@/public/SVG/DashbaordSvg'
import { useDispatch, useSelector } from 'react-redux'
import { handleRememberMe } from '@/app/features/login/rememberme'
import Link from 'next/link'
import { UserService } from '@/userservice/user.service'
import { CookieHelper } from '@/helper/cookie.helper'
import { useRouter } from 'next/navigation'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from 'react'
import { Roboto } from 'next/font/google'
import toast,{Toaster} from 'react-hot-toast'


export const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
})


interface FormData {
    email: string;
    password: string;
}

export default function LoginPage() {
    const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
    const router = useRouter();
    const rememberMe = useSelector((state: any) => state?.rememberMe);
    const dispatch = useDispatch();
    const [showPass, setShowPass] = useState(false);

    const onSubmit = async (data: FormData) => {
        // try {
        //     const res = await UserService?.login({ email: data?.email, password: data?.password });
        //     console.log(res);
        //     if (res?.data?.success) {
                // CookieHelper.set({ key: 'token', value: res?.data?.token })
                router.replace('/dashboard')
        //     }
        // } catch (err) {
        //     console.log(err);
        //     toast.error('Incorrect user or password');
        // }
        reset();
    }

    const updateRememberMe = (value: boolean) => {
        dispatch(handleRememberMe(value));
    }

    return (
        <div className='h-screen w-screen flex bg-white p-6'>
            <Toaster position='top-right'/>
            <div className='flex-1 h-full flex items-center justify-center bg-[#E8F1FD] rounded-l-[30px]'>
                <Image alt='Logo' src={logo} width={500} height={500} className='object-cover' />
            </div>
            <div className='flex-1 h-full flex items-center justify-center bg-[#F1F7F4] rounded-r-[30px]'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md space-y-[30px] px-8 bg-white p-[32px] rounded-[20px]' style={{ boxShadow: "0 6px 12px 0 rgba(106, 115, 129, 0.16), 0 3px 8px 0 rgba(87, 102, 117, 0.06)" }}>
                    <div className='mb-8'>
                        <h1 className={`text-[28px] font-medium text-[#16151C] ${roboto.variable} font-sans`}>Welcome 👋</h1>
                        <p className='text-[#A2A1A8] font-light'>Please login here</p>
                    </div>

                    <div className='space-y-[20px]'>
                        {/* Email Field */}
                        <div className='border border-[#006EC4]  px-4 py-2 rounded-[10px]'>
                            <label htmlFor='email' className='block text-[12px] font-medium text-[#006EC4]'>
                                Email Address
                            </label>
                            <input
                                id='email'
                                type='email'
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                                className='w-full rounded-lg outline-none transition duration-200 text-[#16151C]'
                                placeholder='Enter your email'
                            />
                            {errors.email && (
                                <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className='border border-[#006EC4]  px-4 py-2 rounded-[10px] flex justify-between items-center'>
                                <div>
                                    <label htmlFor='password' className='block text-[12px] font-medium text-[#006EC4]'>
                                        Password
                                    </label>
                                    <input
                                        id='password'
                                        type={`${showPass?"text":"password"}`}
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters'
                                            }
                                        })}
                                        className='w-full outline-none transition duration-200 text-[#16151C]'
                                        placeholder='Enter your password'
                                    />
                                </div>
                                {showPass ?
                                    <button type='button' onClick={()=>setShowPass(prev => !prev)} className='text-xl cursor-pointer'>
                                        <IoEyeOutline />
                                    </button>
                                    :
                                    <button type="button" onClick={()=>setShowPass(prev => !prev)} className='text-xl cursor-pointer'>
                                        <IoEyeOffOutline />
                                    </button>
                                }
                            </div>
                            {errors.password && (
                                <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
                            )}
                        </div>
                        <div className='flex items-center justify-between'>
                            <div>
                                <div className='flex items-center gap-3'>
                                    <label htmlFor='rememberme' className={`border border-[#1570EF] w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer ${rememberMe ? "bg-[#1570EF]" : ""}`}>
                                        <span>{rememberMe ? ticmark : ""}</span>
                                    </label>
                                    <span className='text-[#16151C] leading-[24px] capitalize'>Remembe me</span>
                                </div>
                                <input
                                    type="checkbox"
                                    id="rememberme"
                                    hidden
                                    checked={rememberMe}
                                    onChange={(e) => updateRememberMe(e.target.checked)}
                                />
                            </div>
                            <Link href="/forgetpass" className='text-[#1570EF] text-sm leading-[22.4px]'>
                                Forget Password?
                            </Link>
                        </div>

                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full font-light bg-blue-600 text-white py-3 px-4 rounded-lg
                         cursor-pointer hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isSubmitting ? 'Loggin in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    )
}