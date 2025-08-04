import Image from "next/image";

export default function Homepage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 md:px-8 py-12">
            <div className="max-w-2xl text-center">
                <Image src='/turnup-admin.png' alt="TurnUp Admin Logo" width={200} height={200} className="mx-auto mb-6" />
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                    Smart Jeepney Routing
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-8">
                    Welcome to the Super Admin Portal. Create and manage operator accounts, and create routes
                </p>

                <a href="/auth/login" className="inline-block rounded-lg bg-[#3CC585] px-6 py-3 text-white text-base sm:text-lg font-semibold hover:bg-[#32A96F] transition duration-300">Get Started</a>
            </div>
        </main>
    )
}