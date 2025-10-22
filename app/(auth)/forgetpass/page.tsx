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
import { useRouter } from 'next/navigation';
import { leftAngle } from '@/public/SVG/DashbaordSvg';
import { roboto } from '@/app/_components/Navbar'
import toast, { Toaster } from 'react-hot-toast'

interface FormData {
    email: string;
    password: string;
}

export default function page() {
    const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
    const router = useRouter();
    const rememberMe = useSelector((state: any) => state?.rememberMe);
    const dispatch = useDispatch();

    const onSubmit = async (data: FormData) => {
        // try {
        //     const res = await UserService?.login({ email: data?.email, password: data?.password });
        //     console.log(res);
        //     if (res?.data?.success) {
        //         CookieHelper.set({ key: 'token', value: res?.data?.token })
        //         router.replace('/dashboard')
        //     }
        // } catch (err) {
        //     console.log(err);
        // }
        reset();
        toast.success('We have sent a code to your email address.')
        setTimeout(()=>{
            router.push('/otp')
        },2000)
    }

    const updateRememberMe = (value: boolean) => {
        dispatch(handleRememberMe(value));
    }

    return (
        <div className='h-screen w-screen flex bg-white p-6'>
            <Toaster position='top-right' />
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
                        <h3 className={`text-[#16151C] text-[28px] leading-[42px] font-medium ${roboto.variable} font-sans`}>Forgot Password</h3>
                        <p className='text-[#A2A1A8] leading-[24px] font-light'>Enter your registered email address. We'll sesnd yu a code to reset your password</p>
                    </div>

                    <div>
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
                        </div>
                        {errors.email && (
                            <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-light cursor-pointer'
                    >
                        {isSubmitting ? 'Sending...' : 'Send OTP'}
                    </button>
                </form>
            </div>
        </div>
    )
}