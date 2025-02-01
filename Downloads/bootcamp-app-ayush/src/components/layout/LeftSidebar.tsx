// src/components/layout/LeftSidebar.tsx
"use client";

import { FaUser, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";

const LeftSidebar = () => {
    const { logout } = useAuthStore((state) => state);
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        console.log("User logged out");
        logout();
        router.push("/login");
    };

    return (
        <div className="flex flex-col h-full justify-between p-4">
            {/* Top Section */}
            <div>
                <Link href="/">
                    <div className="text-3xl font-bold mb-8">E-Learning</div>
                </Link>
                <Link
                    href="/profile"
                    className={`flex items-center w-full p-2 mb-4 text-lg rounded-lg ${
                        pathname === "/profile"
                            ? "bg-gray-700 text-white"
                            : "text-white hover:bg-gray-700"
                    }`}
                >
                    <FaUser className="mr-2" /> Profile
                </Link>
                <Link
                    href="/dashboard"
                    className={`flex items-center w-full p-2 mb-4 md:mb-0 text-lg rounded-lg ${
                        pathname === "/dashboard"
                            ? "bg-gray-700 text-white"
                            : "text-white hover:bg-gray-700"
                    }`}
                >
                    <FaTachometerAlt className="mr-2" /> Dashboard
                </Link>
            </div>

            {/* Bottom Section */}
            <button
                className="flex items-center w-full p-2 rounded-lg text-red-500 hover:bg-gray-700"
                onClick={handleLogout}
            >
                <FaSignOutAlt className="mr-2" /> Logout
            </button>
        </div>
    );
};

export default LeftSidebar;
