// src/components/auth/VerifyEmail.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const VerifyEmail = () => {
    const [status, setStatus] = useState({ loading: true, message: "", success: false });
    const router = useRouter();

    useEffect(() => {
        const verify = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");

            if (!token) {
                setStatus({ loading: false, message: "Invalid or missing token.", success: false });
                return;
            }

            try {
                const response = await axios.get(`/api/verify-email?token=${token}`);
                setStatus({ loading: false, message: response.data.message, success: true });
                setTimeout(() => router.push("/"), 3000);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setStatus({
                        loading: false,
                        message: error.response?.data?.error || "Verification failed.",
                        success: false,
                    });
                } else {
                    setStatus({
                        loading: false,
                        message: "An unexpected error occurred.",
                        success: false,
                    });
                }
            }
        };

        verify();
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950">
            {status.loading ? (
                <div className="text-white text-lg">Verifying your email...</div>
            ) : (
                <div
                    className={`p-6 rounded-lg shadow-lg w-96 text-center ${status.success ? "bg-green-800" : "bg-red-800"
                        }`}
                >
                    <h1
                        className={`text-2xl font-bold ${status.success ? "text-green-200" : "text-red-200"
                            }`}
                    >
                        {status.success ? "Verification Successful" : "Verification Failed"}
                    </h1>
                    <p className="mt-4 text-white">{status.message}</p>
                    {status.success && (
                        <p className="mt-2 text-sm text-gray-300">Redirecting to login page...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;
