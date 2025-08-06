import { Toaster } from "sonner"
import Sidebar from "../../../components/Sidebar"
import Navbar from "../../../components/Navbar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                    <Toaster
                        position="bottom-right"
                        toastOptions={{
                            style: {
                                background: '#ffffff',
                                color: "#1f2937",
                                padding: '14px 18px',
                                borderRadius: '10px',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
                                fontSize: '14px',
                                fontWeight: 500
                            },
                            duration: 3000
                        }}
                    />
                    {children}
                </main>
            </div>
        </div>
    )
}