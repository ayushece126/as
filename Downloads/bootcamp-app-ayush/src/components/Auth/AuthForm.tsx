"use client";

import { ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PulseLoader from "react-spinners/PulseLoader";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface AuthFormProps {
  title: string;
  fields: {
    id: string;
    type: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }[];
  error: string;
  onSubmit: (e: React.FormEvent) => void;
  extraContent?: ReactNode;
  buttonText: string;
  loading: boolean;
  navigationText: string;
  navigationLink: string;
  forgotPasswordLink?: string;
}

const AuthForm = ({
  title,
  fields,
  error,
  onSubmit,
  extraContent,
  buttonText,
  loading,
  navigationText,
  navigationLink,
  forgotPasswordLink,
}: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
      {/* Main Container */}
      <div className="flex w-full max-w-4xl h-[550px] rounded-lg shadow-xl overflow-hidden bg-white">
        {/* Left Image Section */}
        <div className="w-1/2 hidden md:block relative h-full">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/images/about.jpg')" }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="absolute inset-0 flex justify-center items-center text-center px-8 text-white">
            <h1 className="text-4xl font-bold mb-4">ArcSys Lab</h1>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-900 h-full p-6">
          <div className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-semibold text-white mb-6">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-6">
                {fields.map((field) => (
                  <div key={field.id} className="relative">
                    <Label htmlFor={field.id} className="text-white text-lg">
                      {field.label}
                    </Label>
                    <Input
                      id={field.id}
                      type={
                        field.type === "password" && field.id === "password"
                          ? showPassword
                            ? "text"
                            : "password"
                          : field.type
                      }
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={field.onChange}
                      required
                      className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-green-400"
                    />
                    {field.type === "password" && field.id === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-8 right-3 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible className="h-5 w-auto" />
                        ) : (
                          <AiOutlineEye className="h-5 w-auto" />
                        )}
                      </button>
                    )}
                  </div>
                ))}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {extraContent}
                <Button
                  type="submit"
                  className="w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400"
                  disabled={loading}
                >
                  {buttonText}
                  {loading && <PulseLoader size={6} color="#fff" />}
                </Button>
              </form>
              <p className="mt-4 text-center text-sm text-white">
                {navigationText}{" "}
                <Link
                  href={navigationLink}
                  className="text-blue-500 hover:underline"
                >
                  here
                </Link>
              </p>
              {forgotPasswordLink && (
                <p className="mt-2 text-center text-sm text-white">
                  <Link
                    href={forgotPasswordLink}
                    className="text-blue-500 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </p>
              )}
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
