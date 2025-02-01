"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ResetPasswordUI from "./ResetFormView";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!token) {
      setError("Invalid or missing token");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/reset-password", { token, newPassword });
      setSuccessMessage("Password updated successfully. Redirecting...");
      setTimeout(() => router.push("/login"), 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Password reset failed");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResetPasswordUI
      newPassword={newPassword}
      setNewPassword={setNewPassword}
      handleSubmit={handleSubmit}
      error={error}
      loading={loading}
      successMessage={successMessage}
    />
  );
}
