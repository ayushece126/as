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
import BootcampDetails from "../Dashboard/components/BootcampDetails";
import StatCard from "../Dashboard/components/StatCard";
import { useState } from "react";
import { Badge } from "../ui/badge";

interface Enrollment {
    userName: string;
    userEmail: string;
    courseTitle: string;
    enrolledAt: string;
}

export default function AdminHomeLayout() {
    const user = useAuthStore((state) => state.user);
    const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
    const router = useRouter();
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loadingEnrollments, setLoadingEnrollments] = useState(true);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const response = await fetch("/api/enrollments");
                const data = await response.json();
                setEnrollments(data);
            } catch (error) {
                console.error("Failed to fetch enrollments:", error);
            } finally {
                setLoadingEnrollments(false);
            }
        };

        if (user?.role === "admin") {
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
                            className="w-full border border-gray-200 text-slate-950 rounded-lg px-3 py-1 outline-none"
                        />
                    </div>
                    <div className="ml-auto">
                        <UserDropdown />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <StatCard totalStudents={enrollments.length} />
                    <div className="min-h-[100vh] flex-1 md:min-h-min flex items-center justify-center" >
                        <BootcampDetails />
                    </div>

                    {/* Student Enrollments Section */}
                    <div className="w-full h-full bg-white border border-gray-300 rounded-lg shadow-md">
                        {/* Header Section */}
                        <div className="bg-gray-100 px-4 py-2 rounded-t-md border-b border-gray-300">
                            <h2 className="text-xl text-gray-800 font-semibold">Student Enrollments</h2>
                        </div>

                        {loadingEnrollments ? (
                            <div className="flex h-full justify-center items-center p-4">
                                <PulseLoader size={12} color="#000" />
                            </div>
                        ) : (
                            /* Table Container */
                            <div className="mt-2 mx-2 p-2">
                                <div className="overflow-x-auto bg-white rounded-t-md">
                                    <table className="w-full border-collapse border-spacing-y-2">
                                        <thead>
                                            <tr className="bg-gray-100 text-gray-500 text-m leading-normal border border-gray-300">
                                                <th className="py-2 px-4 text-left">Student</th>
                                                <th className="py-2 px-4 text-left">Email</th>
                                                <th className="py-2 px-4 text-left">Bootcamp</th>
                                                <th className="py-2 px-4 text-center">Enrolled</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {enrollments.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} className="text-center py-4 text-gray-500">
                                                        No enrollments found
                                                    </td>
                                                </tr>
                                            ) : (
                                                enrollments.map((enrollment, index) => (
                                                    <tr
                                                        key={index}
                                                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                                                    >
                                                        <td className="py-2 px-4 text-gray-800 text-left text-m font-medium">
                                                            {enrollment.userName}
                                                        </td>
                                                        <td className="py-2 px-4 text-gray-800 text-left">
                                                            <span className="text-sm text-gray-600">
                                                                {enrollment.userEmail}
                                                            </span>
                                                        </td>
                                                        <td className="py-2 px-4 text-gray-800 text-left">
                                                            {enrollment.courseTitle}
                                                        </td>
                                                        <td className="py-2 px-4 text-center">
                                                            <Badge variant="default" className="bg-gray-400 text-white hover:bg-gray-400 p-1 text-sm">
                                                                {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                                            </Badge>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}
