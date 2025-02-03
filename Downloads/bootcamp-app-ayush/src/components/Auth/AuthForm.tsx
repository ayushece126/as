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
    <div className="flex items-center justify-center w-screen min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="flex w-full max-w-3xl h-auto rounded-lg shadow-lg overflow-hidden bg-white border border-gray-200">
        {/* Right Form Section */}
        <div className="w-full flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-semibold text-gray-800 mb-6">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-5">
                {fields.map((field) => (
                  <div key={field.id} className="relative">
                    <Label htmlFor={field.id} className="text-gray-700 text-sm">
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
                      className="w-full p-3 mt-2 bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
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
                  className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                  disabled={loading}
                >
                  {buttonText}
                  {loading && <PulseLoader size={6} color="#fff" />}
                </Button>
              </form>
              <p className="mt-4 text-center text-sm text-gray-600">
                {navigationText}{" "}
                <Link
                  href={navigationLink}
                  className="text-blue-500 hover:underline"
                >
                  here
                </Link>
              </p>
              {forgotPasswordLink && (
                <div className="mt-4 flex items-center space-x-4">
                  <img
                    src="/images/avatar-placeholder.png"//path
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-sm text-gray-600">
                    <Link
                      href={forgotPasswordLink}
                      className="text-blue-500 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </p>
                </div>
              )}
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
