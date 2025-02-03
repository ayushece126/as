import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Shield,
  Users,
  BadgeCheck,
  Eye,
  EyeOff,
} from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => (
  <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow hover:scale-105 transform transition">
    <div className="p-3 bg-[#4A90E2] rounded-lg text-white">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
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
    <div className="h-screen bg-gradient-to-br from-gray-100 to-white text-gray-900 p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-4">
              Start Your Learning Journey Today
            </h1>

            <div className="space-y-4">
              <Feature
                icon={<Users className="w-6 h-6" />}
                title="Interactive Learning"
                description="Engage with instructors and peers in real-time."
              />
              <Feature
                icon={<BadgeCheck className="w-6 h-6" />}
                title="Track Your Progress"
                description="Easily monitor your course journey and achievements."
              />
              <Feature
                icon={<Shield className="w-6 h-6" />}
                title="Flexible Learning"
                description="Learn at your own pace with lifetime access to courses."
              />
            </div>
          </div>

          {/* Right Column - Sign Up Form */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    First Name
                  </label>
                  <Input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    type="text"
                    className="bg-gray-50 border border-gray-300 h-10 px-3"
                    placeholder="John"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Last Name
                  </label>
                  <Input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    type="text"
                    className="bg-gray-50 border border-gray-300 h-10 px-3"
                    placeholder="Doe"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Username</label>
                <Input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  type="text"
                  className="bg-gray-50 border border-gray-300 h-10 px-3"
                  placeholder="Your username"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className="bg-gray-50 border border-gray-300 h-10 px-3"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 rounded-md p-2 h-10"
                  disabled={loading}
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Password</label>
                <div className="relative">
                  <Input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    className="bg-gray-50 border border-gray-300 h-10 px-3 pr-10"
                    placeholder="Your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum length is 8 characters.
                </p>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-[#4A90E2] text-white hover:bg-[#3a7bc1] h-10"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>

              <p className="text-xs text-gray-500">
                By creating an account, you agree to the
                <a href="#" className="text-[#060701] hover:underline ml-1">
                  <strong>Terms of Service</strong>
                </a>
                . We may occasionally send you account-related emails.
              </p>

              <p className="text-sm text-center text-gray-500">
                Already have an account?
                <a href="/login" className="text-[#4A90E2] hover:underline ml-1">
                  <strong>
                  Login
                  </strong>
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupView;
