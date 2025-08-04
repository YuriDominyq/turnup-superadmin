"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../../../lib/supabase"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ProfilePage() {

    const router = useRouter()

    const [profile, setProfile] = useState<{
        first_name: string
        last_name: string
        email: string
        phone: string
        photo_url: string
    } | null>(null)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true)
            setError(null)

            const { data: { user }, error: authError } = await supabase.auth.getUser()

            if (authError || !user) {
                setError("You must logged in to view the dashboard")
                setLoading(false)
                return
            }

            const { data, error: profileError } = await supabase
                .from("superadmin_profiles")
                .select("*")
                .eq("id", user.id)
                .single()

            if (profileError) {
                setError("Failed to fetch profile")
            } else {
                setProfile(data)
            }

            setLoading(false)

        }

        fetchProfile()
    }, [])

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
    }

    if (!profile) {
        return <div className="flex justify-center items-center h-screen">No profile data found.</div>
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded shadow-md max-w-md w-full space-y-4 text-center">
                <Image
                    src={profile.photo_url}
                    alt="profile"
                    width={96}
                    height={96}
                    className="rounded-full object-cover mx-auto"
                />

                <h1 className="text-2xl font-bold">
                    {profile.first_name} {profile.last_name}
                </h1>

                <p className="text-gray-600">{profile.email}</p>
                <p className="text-gray-600">📞 {profile.phone}</p>

                <button
                    onClick={async () => {
                        await supabase.auth.signOut()
                        router.push('/auth/login')
                    }}
                    className="text-sm text-red-500 mt-2 hover:underline cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}