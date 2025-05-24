"use client";
import React, { useContext, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { userContext } from "../../ContextAPI/IsAuthContext";
import { errorToast, successToast } from "../../reuseComponents/ReactToast";
import useAdminLogin from "../../services/admin/useAdminLogin";
interface AdminLoginForm {
  email: string;
  password: string;
}
const Admin = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setCallContext, callContext } = useContext(userContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminLoginForm>();

  const { errorLogin, successLogin, adminLogin } = useAdminLogin();

  const adminForm: SubmitHandler<AdminLoginForm> = (data) => {
    adminLogin(data);
  };

  useEffect(() => {
    if (successLogin) {
      reset();
      successToast(successLogin);
      setCallContext(!callContext);
    }
  }, [successLogin, reset, setCallContext, callContext]);

  useEffect(() => {
    if (errorLogin) {
      errorToast(errorLogin);
    }
  }, [errorLogin]);
  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left: Login Form */}
      <div className="w-full md:w-1/2  h-screen px-5 sm:px-10 py-10">
        <Link href="/">
          <Image
            src="/admin/food_logo.jpg"
            alt="food_logo"
            width={400}
            height={400}
            className="w-[80px] h-[80px] cursor-pointer"
          />
        </Link>

        <div className="w-full flex items-center h-[85%] justify-center p-8 ">
          <div className="w-full rounded-md border shadow-md z-10 border-gray-100 px-4 sm:px-9 py-5 max-w-md space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Admin Login
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(adminForm)}>
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="admin@example.com"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  {...register("email", {
                    required: "Admin Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Valid email is required",
                    },
                  })}
                />

                {errors.email && (
                  <p className="text-red-500 text-[10px] absolute top-full">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="*********"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  {...register("password", {
                    required: "password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters password is required",
                    },
                  })}
                />
                <div
                  className="absolute top-9 right-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[10px] absolute top-full">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden md:block md:w-[50%]">
        <Image
          height={200}
          width={200}
          src="/admin/login.jpg"
          alt="Admin login"
          className="w-full h-full object-contain object-center bg-blue-600"
        />
      </div>
    </div>
  );
};

export default Admin;
