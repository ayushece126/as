import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Shield,
  Users,
  BadgeCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import PulseLoader from "react-spinners/PulseLoader";
import Link from "next/link";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => (
  <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg hover:scale-105 transform transition">
    <div className="p-3 bg-[#4A90E2] rounded-lg">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  </div>
);

interface LoginViewProps {
  showPassword: boolean;
  email: string;
  password: string;
  loading: boolean;
  error: string;
  rememberMe: boolean;
  setShowPassword: (value: boolean) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setRememberMe: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function LoginView({
  showPassword,
  email,
  password,
  loading,
  error,
  rememberMe,
  setShowPassword,
  setEmail,
  setPassword,
  setRememberMe,
  handleSubmit,
}: LoginViewProps) {
  return (
    <div className="h-screen bg-gradient-to-r from-white via-[#F7F9FC] to-white text-gray-800 p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-[#4A90E2] rounded-full flex justify-center items-center">
            {/* Add a Superlist logo here */}
            <span className="font-semibold text-lg text-white">S</span>
          </div>
          <span className="text-3xl font-semibold text-[#4A90E2]">Superlist</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold mb-2">Welcome Back</h1>
              <p className="text-gray-600">
                Log in to access your courses and start learning with Superlist.
              </p>
            </div>

            <div className="space-y-4">
              <Feature
                icon={<Users className="w-6 h-6 text-white" />}
                title="Interactive Learning"
                description="Engage with instructors and peers in real-time."
              />
              <Feature
                icon={<BadgeCheck className="w-6 h-6 text-white" />}
                title="Track Your Progress"
                description="Easily monitor your course journey and achievements."
              />
              <Feature
                icon={<Shield className="w-6 h-6 text-white" />}
                title="Flexible Learning"
                description="Learn at your own pace with lifetime access to courses."
              />
              <div className="mt-6 text-gray-600">
                <h3 className="font-semibold">Join the Superlist Community</h3>
                <p>
                  Explore a vast library of expertly crafted e-courses. Our
                  platform allows you to access courses anytime, anywhere, and
                  grow your skills at your own pace.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm mb-1 block text-gray-700">Email</label>
                <Input
                  type="email"
                  className="bg-gray-50 border border-gray-300 h-9 focus:ring-2 focus:ring-[#4A90E2]"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm mb-1 block text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="bg-gray-50 border border-gray-300 h-9 pr-10 focus:ring-2 focus:ring-[#4A90E2]"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#4A90E2] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#4A90E2] text-white hover:bg-[#3a7bc1] h-9 transition-all"
                disabled={loading}
              >
                {loading ? <PulseLoader size={6} color="white" /> : "Log In"}
              </Button>

              <p className="text-sm text-center">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#4A90E2] hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
