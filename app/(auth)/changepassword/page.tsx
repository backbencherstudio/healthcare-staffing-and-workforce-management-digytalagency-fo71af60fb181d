'use client'

import logo from '@/public/SVG/logo.svg'
import Image from 'next/image'
import { useForm } from 'react-hook-form' // Correct named import
import { leftAngle, ticmark } from '@/public/SVG/DashbaordSvg'
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


export const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
})


interface FormData {
    confirmPassword: string;
    password: string;
}

export default function LoginPage() {
    const { handleSubmit, register, reset, formState: { errors, isSubmitting }, watch } = useForm<FormData>();
    const router = useRouter();
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [resetSuccess,setResetSucccess] = useState(false);

    const password = watch('password');

    const onSubmit = async (data: FormData) => {
        // try {
        //     const res = await UserService?.resetPassword({ password: data?.password });
        //     console.log(res);
        //     if (res?.data?.success) {
        //         router.replace('/login')
        //     }
        // } catch (err) {
        //     console.log(err);
        // }
        reset();
        setResetSucccess(true);
    }

    return (
        <div className='h-screen w-screen flex bg-white p-6'>
            <div className='flex-1 h-full flex items-center justify-center bg-[#E8F1FD] rounded-l-[30px]'>
                <Image alt='Logo' src={logo} width={500} height={500} className='object-cover' />
            </div>
            <div className='flex-1 h-full flex items-center justify-center bg-[#F1F7F4] rounded-r-[30px]'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md space-y-[30px] px-8 bg-white p-[32px] rounded-[20px]' style={{ boxShadow: "0 6px 12px 0 rgba(106, 115, 129, 0.16), 0 3px 8px 0 rgba(87, 102, 117, 0.06)" }}>
                    <button type="button" onClick={() => router.back()} className='mb-8 cursor-pointer flex items-center gap-2 text-[#1570EF]'>
                        {leftAngle}
                        <span>back</span>
                    </button>

                    <div>
                        <h3 className={`text-[#16151C] text-[28px] leading-[42px] font-medium ${roboto.variable} font-sans`}>Reset your password</h3>
                        <p className='text-[#A2A1A8] leading-[24px] font-light'>Reset your password. Please ensure it is at least 6 characters long</p>
                    </div>

                    <div className='space-y-[20px]'>
                        <div>
                            <div className='border border-[#006EC4]  px-4 py-2 rounded-[10px] flex justify-between items-center'>
                                <div>
                                    <label htmlFor='password' className='block text-[12px] font-medium text-[#006EC4]'>
                                        Password
                                    </label>
                                    <input
                                        id='password'
                                        type={`${showPass ? "text" : "password"}`}
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
                                    <button type='button' onClick={() => setShowPass(prev => !prev)} className='text-xl cursor-pointer'>
                                        <IoEyeOutline />
                                    </button>
                                    :
                                    <button type="button" onClick={() => setShowPass(prev => !prev)} className='text-xl cursor-pointer'>
                                        <IoEyeOffOutline />
                                    </button>
                                }
                            </div>
                            {errors.password && (
                                <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <div className='border border-[#006EC4]  px-4 py-2 rounded-[10px] flex justify-between items-center'>
                                <div>
                                    <label htmlFor='confirmPassword' className='block text-[12px] font-medium text-[#006EC4]'>
                                        Confirm password
                                    </label>
                                    <input
                                        id='confirmPassword'
                                        type={`${showConfirmPass ? "text" : "password"}`}
                                        {...register('confirmPassword', {
                                            required: 'Confirm password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters'
                                            },
                                            validate: value => value === password || 'Passwords do not match'
                                        })}
                                        className='w-full outline-none transition duration-200 text-[#16151C]'
                                        placeholder='Re-enter the password'
                                    />
                                </div>
                                {showConfirmPass ?
                                    <button type='button' onClick={() => setShowConfirmPass(prev => !prev)} className='text-xl cursor-pointer'>
                                        <IoEyeOutline />
                                    </button>
                                    :
                                    <button type="button" onClick={() => setShowConfirmPass(prev => !prev)} className='text-xl cursor-pointer'>
                                        <IoEyeOffOutline />
                                    </button>
                                }
                            </div>
                            {errors.confirmPassword && (
                                <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full font-light bg-blue-600 text-white py-3 px-4 rounded-lg
                         cursor-pointer hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isSubmitting ? 'Reseting...' : 'Reset'}
                    </button>
                </form>
            </div>
            {resetSuccess&&<div className='fixed inset-0 bg-[#0000001c] backdrop-blur-sm flex items-center justify-center'>
                <div className='w-full max-w-md space-y-[30px] px-8 bg-white p-[32px] rounded-[20px]' style={{ boxShadow: "0 6px 12px 0 rgba(106, 115, 129, 0.16), 0 3px 8px 0 rgba(87, 102, 117, 0.06)" }}>
                    <h3 className='text-center text-[100px] leading-[92px]'>🎉</h3>
                    <div>
                        <h3 className={`text-[#16151C] text-[28px] leading-[42px] font-medium ${roboto.variable} font-sans text-center`}>Password Update Successfully</h3>
                        <p className='text-[#A2A1A8] leading-[24px] font-light text-center'>Your password has been update successfully</p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type='button'
                        onClick={()=>router.replace('/login')}
                        className='w-full font-light bg-blue-600 text-white py-3 px-4 rounded-lg
                         cursor-pointer hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        Back to login
                    </button>
                </div>
            </div>}
        </div>
    )
}