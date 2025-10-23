'use client'

import logo from '@/public/SVG/logo.svg'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { ticmark } from '@/public/SVG/DashbaordSvg'
import { useDispatch, useSelector } from 'react-redux'
import { handleRememberMe } from '@/app/features/login/rememberme'
import Link from 'next/link'
import { UserService } from '@/userservice/user.service'
import { CookieHelper } from '@/helper/cookie.helper'
import { useRouter } from 'next/navigation';
import { leftAngle } from '@/public/SVG/DashbaordSvg';
import { roboto } from '@/app/_components/Navbar'
import { useState, useRef, useEffect } from 'react'

interface FormData {
    otp: string[];
}

export default function page() {
    const { handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>();
    const router = useRouter();
    const rememberMe = useSelector((state: any) => state?.rememberMe);
    const dispatch = useDispatch();
    
    const [otp, setOtp] = useState<string[]>(['5', '9', '3', '2', '7', '0']);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleResendOtp = () => {
        // Add your resend OTP logic here
        setTimer(60);
        setCanResend(false);
        // You can call your API to resend OTP here
    };

    const handleChange = (index: number, value: string) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto focus to next input
            if (value !== '' && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        const pastedNumbers = pastedData.replace(/[^0-9]/g, '').slice(0, 6);
        
        const newOtp = [...otp];
        pastedNumbers.split('').forEach((char, index) => {
            if (index < 6) {
                newOtp[index] = char;
            }
        });
        setOtp(newOtp);
        
        // Focus the next empty input or last input
        const nextEmptyIndex = newOtp.findIndex(val => val === '');
        if (nextEmptyIndex !== -1) {
            inputRefs.current[nextEmptyIndex]?.focus();
        } else {
            inputRefs.current[5]?.focus();
        }
    };

    const onSubmit = async () => {
        const otpValue = otp.join('');
        // try {
        //     const res = await UserService?.verifyOtp({ otp: otpValue });
        //     console.log(res);
        //     if (res?.data?.success) {
        //         CookieHelper.set({ key: 'token', value: res?.data?.token })
        //         router.replace('/dashboard')
        //     }
        // } catch (err) {
        //     console.log(err);
        // }
        reset();
        router.push('/changepassword')
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
                <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md space-y-[30px] px-8 bg-white p-[32px] rounded-[20px]' style={{ boxShadow: "0 6px 12px 0 rgba(106, 115, 129, 0.16), 0 3px 8px 0 rgba(87, 102, 117, 0.06)" }}>
                    <button type="button" onClick={() => router.back()} className='mb-8 cursor-pointer flex items-center gap-2 text-[#1570EF]'>
                        {leftAngle}
                        <span>back</span>
                    </button>

                    <div>
                        <h3 className={`text-[#16151C] text-[28px] leading-[42px] font-medium ${roboto.variable} font-sans`}>Enter OTP</h3>
                        <p className='text-[#A2A1A8] leading-[24px] font-light'>We have share a code of your registered email address mathew.west@ienetworksolutions.com</p>
                    </div>

                    {/* Timer and Resend Button */}
                    <div className='flex justify-between items-center'>
                        <div className='text-[#A2A1A8] text-sm'>
                            {canResend ? 'You can now resend OTP' : `Resend code in ${timer} seconds`}
                        </div>
                        <button
                            type='button'
                            onClick={handleResendOtp}
                            disabled={!canResend}
                            className='text-[#1570EF] cursor-pointer text-sm font-medium disabled:text-[#A2A1A8] disabled:cursor-not-allowed hover:underline'
                        >
                            Resend code
                        </button>
                    </div>

                    <div className='space-y-2'>
                        <div className='flex gap-2 justify-between'>
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    type='text'
                                    value={otp[index]}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className='w-12 h-12 border border-[#006EC4] rounded-[10px] text-center text-[#16151C] text-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#006EC4]'
                                    maxLength={1}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        disabled={isSubmitting || otp.join('').length !== 6}
                        className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-light cursor-pointer'
                    >
                        {isSubmitting ? 'Verifing...' : 'Verify'}
                    </button>
                </form>
            </div>
        </div>
    )
}