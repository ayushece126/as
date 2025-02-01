// src/components/layout/StudentDashboard.tsx
"use client";

import { Divider } from "../ui/Divider";
import { useAuthStore } from "@/store/auth";
import UserDropdown from "../ui/UserDropdown";

const StudentDashboard = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <div className="hidden sm:flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Student Dashboard</h1>
                <UserDropdown
                    avatarSrc="https://github.com/shadcn.png"
                    fallback={user?.name[0]?.toUpperCase() || "U"}
                />
            </div>
            <Divider />
            <div className="p-4 sm:p-0 rounded-lg text-white">
                <h1 className="text-2xl font-bold ">Welcome Student!</h1>
                <p className="text-lg text-gray-300">Access your enrolled bootcamps here.</p>
                {/* Add Student-specific content */}
            </div>
        </div>
    );
};

export default StudentDashboard;
