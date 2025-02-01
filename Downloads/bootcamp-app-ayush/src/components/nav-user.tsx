"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/auth";

export function NavUser() {
    const { user } = useAuthStore();

    if (!user) return null; // Hide component if user is not available

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={"U"} alt={user.name || "User"} />
                        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
