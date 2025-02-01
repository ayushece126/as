"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, Globe, ChevronDown } from "lucide-react";
import axios from "axios";

interface ResetPasswordUIProps {
  newPassword: string;
  setNewPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  error: string;
  loading: boolean;
  successMessage: string;
}

const ResetPasswordUI = ({
  newPassword,
  setNewPassword,
  handleSubmit,
  error,
  loading,
  successMessage,
}: ResetPasswordUIProps) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#1C1C1C] via-[#333333] to-[#1C1C1C] text-gray-200 p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-[#E1F554] rounded-full flex justify-center items-center">
            {/* Add Superlist Logo */}
            <span className="font-semibold text-lg text-black">S</span>
          </div>
          <span className="text-4xl font-semibold text-[#E1F554]">Superlist</span>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-semibold mb-4">Reset Password</h1>
              <p className="text-gray-400">Create a new secure password</p>
            </div>

            <div className="space-y-4">
              <Feature
                icon={<Shield className="w-8 h-8 text-[#E1F554]" />}
                title="Security First"
                description="Your new password must be different from previous passwords."
              />
            </div>
          </div>

          {/* Right Column - Reset Form */}
          <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#E1F554]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <p className="text-red-500 text-sm bg-red-100 p-2 rounded-lg">{error}</p>
              )}
              {successMessage && (
                <p className="text-green-500 text-sm bg-green-100 p-2 rounded-lg">{successMessage}</p>
              )}

              <div>
                <label className="text-sm mb-1 block">New Password</label>
                <Input
                  type="password"
                  className="bg-[rgba(0,0,0,0.2)] border-0 h-12 rounded-lg focus:ring-2 focus:ring-[#E1F554]"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#E1F554] text-black hover:bg-[#d4e84d] h-12 rounded-lg transition duration-200"
                disabled={loading}
              >
                {loading ? "Processing..." : "Reset Password"}
              </Button>

              <div className="text-center">
                <a
                  href="/login"
                  className="text-sm text-[#E1F554] hover:underline inline-flex items-center"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Login
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-center mt-12 text-sm text-gray-400">
          <div className="flex gap-x-8 items-center">
            <a href="#" className="hover:text-gray-300">
              Terms
            </a>
            <a href="#" className="hover:text-gray-300">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-300">
              Docs
            </a>
            <a href="#" className="hover:text-gray-300">
              Help
            </a>
            <button className="flex items-center gap-2 hover:text-gray-300">
              <Globe size={16} />
              English
              <ChevronDown size={16} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-2">
      <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center">
        {icon}
      </div>
      <h2 className="text-xl font-medium text-[#E1F554]">{title}</h2>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default ResetPasswordUI;

