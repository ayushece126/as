// src/app/dashboard/page.tsx
"use client";

import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LeftSidebar from "@/components/layout/LeftSidebar";
import StudentDashboard from "@/components/Dashboard/StudentDashboard";
import { useAuthStore } from "@/store/auth";

const DashboardPage = () => {
    const { user } = useAuthStore();

    const isAdmin = user?.role === "admin";

    return (
        <DashboardLayout
            leftSidebar={<LeftSidebar />}
            dashboardSection={isAdmin ? <AdminDashboard /> : <StudentDashboard />}
        />
    );
};

export default DashboardPage;
