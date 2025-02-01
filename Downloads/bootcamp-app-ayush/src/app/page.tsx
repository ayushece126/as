// src/app/page.tsx
"use client";
import AdminHomeLayout from "@/components/layout/AdminHomeLayout";
import StudentHomeLayout from "@/components/layout/StudentHomeLayout";
import { useAuthStore } from "@/store/auth";


const Home = () => {
    // const initializeAuth = useAuthStore((state) => state.initializeAuth);

    // useEffect(() => {
    //     initializeAuth();
    // }, [initializeAuth]);
    const user = useAuthStore((state) => state.user);

    const isAdmin = user?.role === "admin";

    return (
        <>
            {isAdmin ? <AdminHomeLayout /> : <StudentHomeLayout />}
        </>
    );
};

export default Home;