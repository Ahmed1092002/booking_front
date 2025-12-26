"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerAction } from "@/actions/auth";
import { Role } from "@/types";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Building2,
  ShoppingBag,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ROLE_CUSTOMER" as Role,
    acceptTerms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      setError("Please accept the terms and conditions");
      setLoading(false);
      return;
    }

    const result = await registerAction({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      roles: [formData.role],
    });

    if (result.success) {
      // Redirect based on role
      if (formData.role === "ROLE_SELLER") {
        router.push("/seller/dashboard");
      } else {
        router.push("/");
      }
    } else {
      setError(result.error || "Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="card-base p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 mb-4">
              <UserPlus className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">
              Join us and start your journey
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-sm text-error">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={formData.fullName}
                onChange={handleChange}
                icon={<User className="h-5 w-5" />}
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                icon={<Mail className="h-5 w-5" />}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                icon={<Lock className="h-5 w-5" />}
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                icon={<Lock className="h-5 w-5" />}
                placeholder="Re-enter your password"
              />
            </div>

            {/* Role Selection */}
            <div>
              <Label>I want to:</Label>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <label
                  className={`
                    cursor-pointer border-2 rounded-lg p-4 text-center transition-all
                    ${
                      formData.role === "ROLE_CUSTOMER"
                        ? "border-primary-500 bg-primary-50"
                        : "border-neutral-200 hover:border-neutral-300"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="role"
                    value="ROLE_CUSTOMER"
                    checked={formData.role === "ROLE_CUSTOMER"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-primary-600" />
                  <span className="block font-semibold text-sm">
                    Book Hotels
                  </span>
                  <span className="block text-xs text-muted-foreground mt-1">
                    Travel & Explore
                  </span>
                </label>

                <label
                  className={`
                    cursor-pointer border-2 rounded-lg p-4 text-center transition-all
                    ${
                      formData.role === "ROLE_SELLER"
                        ? "border-primary-500 bg-primary-50"
                        : "border-neutral-200 hover:border-neutral-300"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="role"
                    value="ROLE_SELLER"
                    checked={formData.role === "ROLE_SELLER"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <Building2 className="h-8 w-8 mx-auto mb-2 text-primary-600" />
                  <span className="block font-semibold text-sm">
                    List Property
                  </span>
                  <span className="block text-xs text-muted-foreground mt-1">
                    Become a Host
                  </span>
                </label>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
              icon={<UserPlus className="h-5 w-5" />}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-sm text-neutral-600 hover:text-neutral-900"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
