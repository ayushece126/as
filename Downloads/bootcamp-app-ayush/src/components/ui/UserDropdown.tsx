"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth";

interface UserDropdownProps {
    avatarSrc?: string;
    fallback?: string;
}

const UserDropdown = ({ avatarSrc}: UserDropdownProps) => {
    const { user } = useAuthStore();
    return (
        <div className="flex items-center gap-3">
            <Avatar>
                <AvatarImage src={avatarSrc} alt="User Avatar" />
                <AvatarFallback>{user?.name[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-slate-950 text-m font-medium">{user?.name}</p>
                <p className="text-sm text-gray-700">{user?.role}</p>
            </div>
        </div>
    );
};

export default UserDropdown;
