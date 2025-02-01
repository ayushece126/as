// src/components/layout/RightSection.tsx
"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth";
import { Divider } from "../ui/Divider";
import UserDropdown from "../ui/UserDropdown";

const RightSection = () => {
    const { user } = useAuthStore();

    if (!user) return <div>Loading...</div>; // Handle loading state gracefully

    return (
        <div className="p-6 bgslate-800 rounded-lg shadow-lg text-white">
            {/* Header */}
            <div className="hidden sm:flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">My Profile</h1>
                <UserDropdown
                    avatarSrc="https://github.com/shadcn.png"
                    fallback={user?.name[0]?.toUpperCase() || "U"}
                />
            </div>
            <Divider />

            {/* Profile Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-1 gap-4 mt-6">
                {/* Profile Info */}
                <div className="border-r border-[#334155] flex flex-col items-center justify-center p-4">
                    <Avatar className="w-32 h-32 shadow-md mb-4">
                        <AvatarImage src="https://github.com/shadcn.png" alt="Profile Image" />
                        <AvatarFallback className="bg-[#475569] text-gray-200">
                            {user?.name[0] || "U"}
                        </AvatarFallback>
                    </Avatar>
                    <p className="text-2xl font-bold">{user?.name}</p>
                    <p className="mt-2 text-lg capitalize text-[#94A3B8]">{user?.role}</p>
                </div>

                {/* Dummy Content Sections */}
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 1</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 2</p>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-lg p-4 shadow-md">
                    <p className="text-gray-300 text-xl">Dummy Content 3</p>
                </div>
            </div>
        </div>
    );
};

export default RightSection;
