"use client"

import { useState } from "react";
import { supabase } from "../../../../../lib/supabase"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Register() {

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const validatePassword = (pwd: string) => {
        const length = pwd.length >= 12
        const capitalLetter = /[A-Z]/.test(pwd)
        const number = /[0-9]/.test(pwd)

        return length && capitalLetter && number
    }

    const isPasswordValid = validatePassword(password)
    const doPasswordsMatch = password === confirmPassword && confirmPassword !== ""

    const handleRegister = async () => {
        setError(null)
        setSuccess(null)

        if (!isPasswordValid) {
            setError("Password must be at least 12 characters, contain an uppercase letter and a number.")
            return
        }

        if (!doPasswordsMatch) {
            setError("Passwords do not match")
            return
        }

        if (!email.includes("@")) {
            setError("Please enter a valid email address.")
            return
        }

        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'https://confirmation-blond.vercel.app/'
            }
        })

        if (error) {
            setError(error.message)
        } else {
            setSuccess('Check your email to confirm your account')
            setTimeout(() => {
                router.push('/auth/login/verifyemail')
            }, 2000)
        }

        setLoading(false)
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Super Admin Registration</h1>

                {/* Email */}
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-3 rounded pr-10"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* Password */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="border p-2 w-full rounded pr-10"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            className="absolute right-3  top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>

                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="border p-2 w-full rounded pr-10"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            className="absolute right-3  top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                        </button>
                    </div>
                </div>

                <div className="text-sm text-gray-600 mb-3 space-y-1">
                    <p className={password.length >= 12 ? "text-green-600" : "text-red-500"}>
                        • At least 12 characters
                    </p>
                    <p className={/[A-Z]/.test(password) ? "text-green-600" : "text-red-500"}>
                        • Includes a capital letter
                    </p>
                    <p className={/[0-9]/.test(password) ? "text-green-600" : "text-red-500"}>
                        • Includes a number
                    </p>
                    <p className={doPasswordsMatch ? "text-green-600" : "text-red-500"}>
                        • Passwords match
                    </p>
                </div>

                <button
                    onClick={handleRegister}
                    disabled={loading || !isPasswordValid || !doPasswordsMatch || !email}
                    className="bg-[#3CC585] text-white w-full py-2 rounded hover:bg-[#32A96F] transition cursor-pointer"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>

                {error && <p className="text-red-600 mt-3">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}
            </div>
        </div>
    )
}