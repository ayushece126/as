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
import EnrolledBootcamps from "../Dashboard/components/EnrolledBootcamps";
import { useState } from "react";
import StudentStatCard from "../Dashboard/components/StudentStatCars";

interface Enrollment {
    courseId: number;
    courseTitle: string;
    enrolledAt: string;
}

export default function StudentHomeLayout() {
    const user = useAuthStore((state) => state.user);
    const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
    const router = useRouter();
    const [enrolledBootcamps, setEnrolledBootcamps] = useState<Enrollment[]>([]);
    const [loadingEnrollments, setLoadingEnrollments] = useState(true);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const response = await fetch("/api/enrollments/me", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("Fetched enrollments:", data); // Log the data to inspect its structure
                if (Array.isArray(data)) {
                    setEnrolledBootcamps(data);
                } else {
                    console.error("Unexpected data format:", data);
                    setEnrolledBootcamps([]); // Set to an empty array if data is not an array
                }
            } catch (error) {
                console.error("Failed to fetch enrollments:", error);
            } finally {
                setLoadingEnrollments(false);
            }
        };

        if (user) {
            fetchEnrollments();
        }
    }, [user]);

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

    const totalEnrolledBootcamps = enrolledBootcamps.length;
    const activeBootcamps = totalEnrolledBootcamps; // Placeholder for active bootcamps
    const finishedBootcamps = totalEnrolledBootcamps; // Placeholder for finished bootcamps

    return (
        <SidebarProvider >
            <AppSidebar />
            <SidebarInset className="bg-gray-100 min-h-screen overflow-x-hidden">
                <header className="flex h-16 shrink-0 items-center gap-2 px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex items-center gap-2 w-full max-w-md">
                        <SidebarTrigger className="-ml-4 text-slate-950 hover:bg-gray-200 hover:text-slate-950" />
                        <Separator orientation="vertical" className="mr-2 h-4 bg-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search for a bootcamp..."
                            className="w-full border border-gray-200 text-slate-950 rounded px-3 py-1 outline-none"
                        />
                    </div>
                    <div className="ml-auto"> {/* Pushes UserDropdown to the right */}
                        <UserDropdown />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <StudentStatCard
                        totalEnrolledBootcamps={totalEnrolledBootcamps}
                        activeBootcamps={activeBootcamps}
                        finishedBootcamps={finishedBootcamps}
                    />
                    <EnrolledBootcamps enrolledBootcamps={enrolledBootcamps} loading={loadingEnrollments} />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
