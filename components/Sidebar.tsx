'use client'

import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FiBarChart2, FiMap, FiUser } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";

const navItems = [
    { name: "Overview", href: "/dashboard", icon: <FiBarChart2 /> },
    { name: "Company", href: "/dashboard/company", icon: <BsFillBriefcaseFill /> },
    { name: "Operators", href: "/dashboard/operators", icon: <MdAdminPanelSettings /> },
    { name: "Create Route", href: "/dashboard/map", icon: <FiMap /> },
    { name: "Profile", href: "/dashboard/profile", icon: <FiUser /> },
]

export default function Sidebar() {

    const pathname = usePathname()

    return (
        <aside className="w-64 h-full bg-white shadow">
            <div className="p-4 flex items-center justify-center">
                <Image src='/turnup-admin.png' alt="TurnUp Admin Logo" width={50} height={50} />
                <span className="ml-2 mr-8 text-lg text-gray-900 font-bold">
                    TurnUp Admin
                </span>
            </div>
            <nav className="p-2">
                <ul className="space-y-2">
                    {navItems.map((item) => {

                        const isActive = pathname === item.href

                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`group flex items-center gap-3 p-2 rounded-transition ${isActive ? "bg-green-200 text-green-800 font-semibold" : "text-gray-700 hover:bg-green-100"}`}
                                >
                                    <span className={`text-xl ${isActive ? "text-green-600" : "text-gray-500 group-hover:text-green-600"}`}>
                                        {item.icon}
                                    </span>
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}