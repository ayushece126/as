// src/components/auth/ForgotPasswordForm.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import AuthForm from "./AuthForm";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      await axios.post("/api/forgot-password", { email });
      setSuccessMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Forgot Password"
      fields={[
        {
          id: "email",
          type: "email",
          label: "Enter your email",
          placeholder: "Enter your email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
        },
      ]}
      error={error}
      onSubmit={handleSubmit}
      buttonText="Send Reset Link"
      loading={loading}
      extraContent={
        successMessage && <p className="text-green-500">{successMessage}</p>
      }
      navigationText={"Go back to login"}
      navigationLink={"/login"}
    />
  );
};

export default ForgotPasswordForm;
