'use client'

import logo from '@/public/SVG/logo.svg'
import Image from 'next/image'
import { useForm } from 'react-hook-form' // Correct named import
import { ticmark } from '@/public/SVG/DashbaordSvg'
import { useDispatch, useSelector } from 'react-redux'
import { handleRememberMe } from '@/app/features/login/rememberme'
import Link from 'next/link'

interface FormData {
    email: string;
    password: string;
}

export default function LoginPage() {
    const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
    const rememberMe = useSelector((state: any) => state?.rememberMe);
    const dispatch = useDispatch();

    const onSubmit = async (data: FormData) => {
        console.log(data);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Login successful!');
        reset();
    }

    const updateRememberMe = (value: boolean) => {
        dispatch(handleRememberMe(value));
    }

    return (
        <div className='h-screen w-screen flex bg-white p-6'>
            <div className='flex-1 h-full flex items-center justify-center bg-[#E8F1FD] rounded-l-[30px]'>
                <Image alt='Logo' src={logo} width={500} height={500} className='object-cover' />
            </div>
            <div className='flex-1 h-full flex items-center justify-center bg-[#F1F7F4] rounded-r-[30px]'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md space-y-[30px] px-8 bg-white p-[32px] rounded-[20px]'>
                    <div className='text-center mb-8'>
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome Back</h1>
                        <p className='text-gray-600'>Please enter your details to sign in</p>
                    </div>

                    <div className='space-y-[20px]'>
                        {/* Email Field */}
                        <div className='space-y-2'>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
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
                                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200'
                                placeholder='Enter your email'
                            />
                            {errors.email && (
                                <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className='space-y-2'>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                                Password
                            </label>
                            <input
                                id='password'
                                type='password'
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    }
                                })}
                                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200'
                                placeholder='Enter your password'
                            />
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
                        className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium'
                    >
                        {isSubmitting ? 'Loggin in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    )
}