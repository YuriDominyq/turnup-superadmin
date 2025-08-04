"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "../../../../../lib/supabase"
import Image from "next/image"

export default function ProfileCreationPage() {

    const router = useRouter()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [photoFile, setPhotoFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const phoneRegex = /^[0-9]{10,15}$/;

    useEffect(() => {
        const checkProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                router.push('/auth/login')
                return
            }

            const { data: existingProfile } = await supabase
                .from("superadmin_profiles")
                .select("id")
                .eq("id", user.id)
                .single()

            if (existingProfile) {
                router.push('/dashboard')
            }
        }

        checkProfile()
    }, [router])


    const handleSubmit = async () => {
        setError(null)
        setLoading(true)

        if (!firstName || !lastName || !phone) {
            setError("Please complete all fields.")
            setLoading(false)
            return
        }

        if (!phoneRegex.test(phone)) {
            setError("Please enter a valid phone number.")
            setLoading(false)
            return
        }

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            setError("User not authenticated.")
            setLoading(false)
            return
        }

        let photoUrl = ''

        if (photoFile) {
            const fileExt = photoFile.name.split('.').pop()
            const filePath = `superadmins/${user.id}_${Date.now()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from("profile-pictures")
                .upload(filePath, photoFile, {
                    contentType: photoFile.type
                })


            if (uploadError) {
                setError("Failed to upload image")
                setLoading(false)
                return
            }

            const { data: publicUrl } = supabase.storage
                .from("profile-pictures")
                .getPublicUrl(filePath)

            photoUrl = publicUrl.publicUrl
        }

        const { error: insertError } = await supabase
            .from("superadmin_profiles")
            .insert({
                id: user.id,
                first_name: firstName,
                last_name: lastName,
                phone,
                photo_url: photoUrl,
                email: user.email ?? ''
            })

        if (insertError) {
            setError(insertError.message)
        } else {
            router.push('/dashboard')
        }

        setLoading(false)
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
                <h1 className="text-xl font-bold text-center">Complete Your Profile</h1>

                <label className="block text-sm font-medium text-gray-700">
                    First Name
                </label>

                <input
                    type="text"
                    placeholder="First Name"
                    className="border p-2 w-full rounded"
                    onChange={(e) => {
                        setFirstName(e.target.value)
                        setError(null)
                    }}
                    value={firstName}
                />
                <label className="block text-sm font-medium text-gray-700">
                    Last Name
                </label>

                <input
                    type="text"
                    placeholder="Last Name"
                    className="border p-2 w-full rounded"
                    onChange={(e) => {
                        setLastName(e.target.value)
                        setError(null)
                    }}
                    value={lastName}
                />

                <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                </label>

                <input
                    type="tel"
                    placeholder="Phone Number"
                    className="border p-2 w-full rounded"
                    onChange={(e) => {
                        setPhone(e.target.value)
                        setError(null)
                    }}
                    value={phone}
                />

                <label className="block text-sm font-medium text-gray-700">
                    Photo
                </label>

                <input
                    type="file"
                    accept="image/*"
                    className="border p-2 w-full rounded"
                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                />

                {photoFile && (
                    <Image
                        src={URL.createObjectURL(photoFile)}
                        alt="Preview"
                        width={96}
                        height={96}
                        unoptimized
                        className="h-24 w-24 rounded-full object-cover mx-auto"
                    />
                )}

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-[#3CC585] text-white py-2 w-full rounded hover:bg-[#32A96F]"
                >
                    {loading ? "Saving..." : "Save Profile"}
                </button>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </div>
        </div>
    )
}