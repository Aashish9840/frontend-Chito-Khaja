import { useState } from "react";

type AdminLoginForm = {
  email: string;
  password: string;
};

// Define expected response type from the API
type LoginResponse = {
  message: string;
};

const useAdminLogin = () => {
  const [successLogin, setSuccessLogin] = useState<string | null>(null);
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  const adminLogin = async (formData: AdminLoginForm): Promise<void> => {
    try {
      setSuccessLogin(null);
      setErrorLogin(null);
      const request = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data: LoginResponse = await request.json();

      if (request.ok) {
        setSuccessLogin(data.message);
      } else {
        setErrorLogin(data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorLogin(error.message);
      } else {
        setErrorLogin("An unknown error occurred");
      }
    }
  };

  return {
    errorLogin,
    successLogin,
    adminLogin,
  };
};

export default useAdminLogin;
