"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import CustomInput from "@/components/textInput/CustomInput";

interface SigninFormData {
  email: string;
  password: string;
}

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>();

  const onSubmit = async (data: SigninFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Signin data:", data);
      // Handle successful signin
    } catch (error) {
      console.error("Signin error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 pb-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">
            Sign in to continue your learning journey
          </p>
        </div>

        <div className="p-6 pt-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}

            <CustomInput
              name="email"
              type="email"
              placeholder="Enter your email"
              level="Email Address"
              register={register}
              errors={errors}
              errorMessage="Email is required"
            />

            <CustomInput
              name="password"
              type="password"
              placeholder="Enter your password"
              level="Password"
              register={register}
              errors={errors}
              errorMessage="password is required"
            />

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-orange-600 hover:text-orange-500"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Dont have an account?{" "}
              <Link
                href="/signup"
                className="text-orange-600 hover:text-orange-500 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
