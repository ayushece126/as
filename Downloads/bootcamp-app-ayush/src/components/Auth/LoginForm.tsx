"use client";

import { useState } from "react";
import type React from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import LoginView from "./LoginView";
// Import your auth setup (context/state management)
import { useAuthStore } from "@/store/auth";

export default function LoginContainer() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "/api/login",
        { email, password, rememberMe },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token } = response.data;
      if (!token) throw new Error("No token received");

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Decode and validate token
      const decoded = jwt.decode(token);

      if (
        decoded &&
        typeof decoded === "object" &&
        "id" in decoded &&
        "name" in decoded &&
        "email" in decoded &&
        "role" in decoded
      ) {
        // Update auth state
        setAuth(token, {
          id: decoded.id as number,
          name: decoded.name as string,
          email: decoded.email as string,
          role: decoded.role as string,
        });

        // Redirect to home
        router.push("/");
      } else {
        throw new Error("Invalid token format");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginView
      showPassword={showPassword}
      email={email}
      password={password}
      loading={loading}
      error={error}
      rememberMe={rememberMe}
      setShowPassword={setShowPassword}
      setEmail={setEmail}
      setPassword={setPassword}
      setRememberMe={setRememberMe}
      handleSubmit={handleSubmit}
    />
  );
}
