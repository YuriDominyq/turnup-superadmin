"use client"

import Image from "next/image";
import ProfileDropDown from "./ProfileDropDown";
import { FiMenu, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => setMenuOpen(!menuOpen)

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "auto"
    }, [menuOpen])

    return (
        <header className="w-full sticky top-0 z-50 bg-white shadow-md">
            <div className="flex items-center justify-between px-6 py-3">

                <div className="flex items-center gap-3">
                    <Image
                        src="/turnup-admin.png"
                        alt="TurnUp Admin Logo"
                        width={40}
                        height={40}
                        className="rounded-md transition-opacity hover:opacity-80"
                    />
                    <span className="text-lg font-semibold tracking-tight text-gray-800">TurnUp Admin</span>
                </div>

                <div className="hidden md:block">
                    <ProfileDropDown />
                </div>

                <button
                    className="md:hidden text-2xl text-gray-700 focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            <div className={`md:hidden px-6 pb-4 transition-all duration-300 ease-in-out ${menuOpen ? `max-h-[200px] opacity-100` : `max-h-0 opacity-0 overflow-hidden`}`}>
                <div className="bg-white rounded-md shadow-sm">
                    <ProfileDropDown />
                </div>
            </div>
        </header>
    )
}