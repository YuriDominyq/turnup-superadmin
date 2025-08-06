"use client"

import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import Image from "next/image";

type Profile = {
    first_name: string;
    last_name: string;
    photo_url: string
}

export default function ProfileDropDown() {

    const [profile, setProfile] = useState<Profile | null>(null)
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        async function fetchProfile() {
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { data, error } = await supabase
                    .from("superadmin_profiles")
                    .select("first_name, last_name, photo_url")
                    .eq("id", user.id)
                    .single()

                if (!error && data) {
                    setProfile(data)
                }
            }
        }

        fetchProfile()
    }, [])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const fullName = `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim()

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-transparent transition-all duration-200 hover:border-blue-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
                <Image
                    src={profile?.photo_url || "/default-avatar.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                />
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-3 w-60 bg-white shadow-xl rounded-xl border border-gray-100 py-3 animate-fade-in z-50">
                    <div className="px-4 pb-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-800">{fullName || "Admin"}</p>
                        <p className="text-xs text-gray-500">Super Admin</p>
                    </div>


                    <div className="mt-2 space-y-1">
                        <a
                            href="/dashboard/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition rounded-md"
                        >
                            View Profile
                        </a>

                        <a
                            href="/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition rounded-md"
                        >
                            Settings
                        </a>

                        <button
                            onClick={async () => {
                                await supabase.auth.signOut();
                                window.location.href = "/auth/login";
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition rounded-md cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}