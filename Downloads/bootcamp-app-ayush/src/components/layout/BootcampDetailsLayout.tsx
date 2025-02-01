"use client";

import { useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import UserDropdown from "../ui/UserDropdown";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
import SearchBar from "../Bootcamps/SearchBar";
import { useState } from "react";
import BootcampDetails from "../BootcampDetails/page";

export default function BootcampDetailsLayout() {
    const user = useAuthStore((state) => state.user);
    const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>("");
    

    useEffect(() => {
        if (!isAuthLoading && !user) {
            router.push("/login");
        }
    }, [user, isAuthLoading, router]);

    if (isAuthLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <PulseLoader color="gray" />
            </div> // Prevents rendering during authentication check
        );
    }

    if (!user) {
        return null; // Ensures the component doesn't render before redirection
    }

    return (
        <SidebarProvider >
            <AppSidebar />
            <SidebarInset className="bg-gray-100 min-h-screen overflow-x-hidden">
                <header className="flex h-16 shrink-0 items-center gap-2 px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex items-center gap-2 w-full max-w-md">
                        <SidebarTrigger className="-ml-4 text-slate-950 hover:bg-gray-200 hover:text-slate-950" />
                        <Separator orientation="vertical" className="mr-2 h-4 bg-muted-foreground" />
                            {/* <input
                                type="text"
                                placeholder="Search for a bootcamp..."
                                className="w-full border border-gray-200 text-slate-950 rounded-lg px-3 py-1 outline-none"
                            /> */}
                            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                    </div>
                    <div className="ml-auto">
                        <UserDropdown />
                    </div>
                </header>
                <div className="text-gray-800 flex flex-1 flex-col gap-4 p-4 pt-0">
                    <BootcampDetails />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
