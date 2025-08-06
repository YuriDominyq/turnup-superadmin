"use client"

import { useRouter } from "next/navigation"
import { supabase } from "../../../../lib/supabase"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function LoginPage() {

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setErrorMsg(error.message)
        } else {
            router.push('/dashboard')
        }
    }
    return (
        <main className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                <Image src='/turnup-admin.png' alt="TurnUp Admin Logo" width={120} height={120} className="mx-auto mb-6" />
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Super Admin Login
                </h1>

                {errorMsg && (
                    <div className="mb-4 text-red-600 text-sm text-center">{errorMsg}</div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3CC585]"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3CC585]"
                            />
                            <div
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                            </div>

                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#3CC585] hover:bg-[#32A96F] text-white font-semibold py-2 px-4 rounded-md transition cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                <p className="justify-center flex items-center mt-4 text-sm text-gray-600">Don&apos;t have an account?&nbsp;
                    <Link href="/auth/login/register" className="text-[#3CC585] hover:text-[#32A96F] font-semibold">Sign up</Link>
                </p>
            </div>
        </main>
    )
}