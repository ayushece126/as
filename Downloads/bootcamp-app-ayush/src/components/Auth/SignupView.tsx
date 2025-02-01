import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Shield,
  Users,
  BadgeCheck,
  Globe,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";

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

function SignupView({
  showPassword,
  togglePasswordVisibility,
  form,
  handleChange,
  handleSubmit,
  error,
  loading,
}: {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  form: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error: string;
  loading: boolean;
}) {
  return (
    <div className="h-screen bg-gradient-to-r from-[#1C1C1C] via-[#333333] to-[#1C1C1C] text-gray-200 p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-[#E1F554] rounded-full" />
          <span className="text-xl font-semibold">ArcSys Labs</span>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold mb-2">
                Start your Learning Journey Today
              </h1>
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
            </div>
          </div>

          {/* Right Column - Sign Up Form */}
          <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-2xl p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="text-sm mb-3">Register with:</p>
                <div className="grid grid-cols-3 gap-3">
                  <SocialButton icon="google" label="Google" />
                  <SocialButton icon="github" label="Github" />
                  <SocialButton icon="gitlab" label="Gitlab" />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[rgba(255,255,255,0.05)] text-gray-400">
                    Or
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm mb-1 block">First Name</label>
                  <Input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    type="text"
                    className="bg-[rgba(0,0,0,0.2)] border-0 h-9"
                    placeholder="First Name"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="text-sm mb-1 block">Last Name</label>
                  <Input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    type="text"
                    className="bg-[rgba(0,0,0,0.2)] border-0 h-9"
                    placeholder="Last Name"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm mb-1 block">Username</label>
                <Input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  type="text"
                  className="bg-[rgba(0,0,0,0.2)] border-0 h-9"
                  placeholder="Username"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="text-sm mb-1 block">Email</label>
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className="bg-[rgba(0,0,0,0.2)] border-0 h-9"
                  placeholder="Email"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full bg-[rgba(0,0,0,0.2)] border-0 rounded-md p-2 text-sm focus:ring-2 focus:ring-[#E1F554] focus:outline-none h-9"
                  disabled={loading}
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="text-sm mb-1 block">Password</label>
                <div className="relative">
                  <Input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    className="bg-[rgba(0,0,0,0.2)] border-0 h-9 pr-10"
                    placeholder="Password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Minimum length is 8 characters.
                </p>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-[#E1F554] text-black hover:bg-[#d4e84d] h-9"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>

              <p className="text-xs text-gray-400">
                By creating an account, you agree to the{" "}
                <a href="#" className="text-[#E1F554] hover:underline">
                  Terms of Service
                </a>
                . Well occasionally send you account-related emails.
              </p>

              <p className="text-sm text-center">
                Already have an account?{" "}
                <a href="/login" className="text-[#E1F554] hover:underline">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-sm text-gray-400">
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
        </footer>
      </div>
    </div>
  );
}

// Helper Components
function SocialButton({ icon, label }: { icon: string; label: string }) {
  return (
    <Button
      variant="outline"
      className="w-full bg-[rgba(0,0,0,0.2)] border-0 text-gray-300 hover:bg-[rgba(0,0,0,0.3)] h-9"
      type="button"
    >
      <div className="w-4 h-4 mr-2">
        {icon === "google" && (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
          </svg>
        )}
      </div>
      {label}
    </Button>
  );
}

export default SignupView;
