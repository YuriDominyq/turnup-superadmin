'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FiBarChart2, FiMap, FiUser } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";

import { IconType } from "react-icons";

type NavItem = {
    name: string
    href: string
    icon: IconType
}

const navItems: NavItem[] = [
    { name: "Overview", href: "/dashboard", icon: FiBarChart2 },
    { name: "Company", href: "/dashboard/company", icon: BsFillBriefcaseFill },
    { name: "Operators", href: "/dashboard/operators", icon: MdAdminPanelSettings },
    { name: "Create Route", href: "/dashboard/map", icon: FiMap },
    { name: "Profile", href: "/dashboard/profile", icon: FiUser },
]

export default function Sidebar() {

    const pathname = usePathname()

    return (
        <aside className="w-64 h-full bg-white shadow-lg transition-all duration-300">
            <nav className="p-4">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        const Icon = item.icon

                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out ${isActive ? "bg-green-100 text-green-800 font-semibold border-l-4 border-green-600" : "text-gray-700 hover:bg-gray-100 hover:shadow-sm"}`}
                                >
                                    <Icon
                                        className={`text-xl transition-all duration-200 group-hover:scale-110 ${isActive ? "text-green-600" : "text-gray-500 group-hover:text-green-600"}`}
                                    />

                                    <span className="transition-colors duration-200">
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}