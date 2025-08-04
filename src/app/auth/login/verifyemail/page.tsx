"use client"

import Link from "next/link"

export default function VerifyEmailPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-[#3CC585]">Check your Email</h1>
                <p className="text-gray-700">
                    We&apos;ve sent you a confirmation link. Please verify your email address to activate your account
                </p>
                <p className="text-sm text-gray-500 mt-4">
                    Once verified, you can log in to your account
                </p>

                <Link href='/auth/login'>
                    <button className="mt-6 bg-[#3CC585] w-full text-white py-2 rounded hover:bg-[#32A96F] transition cursor-pointer">
                        Go back to Login
                    </button>
                </Link>
            </div>
        </div>
    )
}