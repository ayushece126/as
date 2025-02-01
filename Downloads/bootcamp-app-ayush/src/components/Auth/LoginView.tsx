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
  <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg hover:scale-105 transform transition">
    <div className="p-3 bg-[#E1F554] rounded-lg">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-400">{description}</p>
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
    <div className="h-screen bg-gradient-to-r from-[#1C1C1C] via-[#333333] to-[#1C1C1C] text-gray-200 p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-[#E1F554] rounded-full flex justify-center items-center">
            {/* Add a Superlist logo here */}
            <span className="font-semibold text-lg text-black">S</span>
          </div>
          <span className="text-3xl font-semibold text-[#E1F554]">Superlist</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold mb-2">Welcome Back</h1>
              <p className="text-gray-400">Log in to access your courses and start learning with Superlist.</p>
            </div>

            <div className="space-y-4">
              <Feature
                icon={<Users className="w-6 h-6 text-black" />}
                title="Interactive Learning"
                description="Engage with instructors and peers in real-time."
              />
              <Feature
                icon={<BadgeCheck className="w-6 h-6 text-black" />}
                title="Track Your Progress"
                description="Easily monitor your course journey and achievements."
              />
              <Feature
                icon={<Shield className="w-6 h-6 text-black" />}
                title="Flexible Learning"
                description="Learn at your own pace with lifetime access to courses."
              />
              <div className="mt-6 text-gray-400">
                <h3 className="font-semibold">Join the Superlist Community</h3>
                <p>Explore a vast library of expertly crafted e-courses. Our platform allows you to access courses anytime, anywhere, and grow your skills at your own pace.</p>
              </div>
            </div>
          </div>

          <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm mb-1 block">Email</label>
                <Input
                  type="email"
                  className="bg-[rgba(0,0,0,0.2)] border-0 h-9 focus:ring-2 focus:ring-[#E1F554]"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm mb-1 block">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="bg-[rgba(0,0,0,0.2)] border-0 h-9 pr-10 focus:ring-2 focus:ring-[#E1F554]"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
                  <span className="text-sm">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#E1F554] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#E1F554] text-black hover:bg-[#d4e84d] h-9 transition-all"
                disabled={loading}
              >
                {loading ? <PulseLoader size={6} color="#1C1C1C" /> : "Log In"}
              </Button>

              <p className="text-sm text-center">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#E1F554] hover:underline">
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
