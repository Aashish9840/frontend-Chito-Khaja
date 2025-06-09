"use client";
import { useEffect, useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { userValidate } from "../ContextAPI/IsUserAuthContext";
import { AuthForm } from "../ContextAPI/AuthFormContext";

const UserProtectedRoute = ({ children }) => {
    const router = useRouter()
    const { loadingUser, validateUser } = useContext(userValidate);
    const { setShowLogIn } = useContext(AuthForm)
    const path = usePathname()

    useEffect(() => {
        if (loadingUser) return;


        if (!validateUser && path === '/order' || validateUser?.role === "admin" || validateUser?.role === "staff") {
            router.push('/')
            setShowLogIn(true)
        }
    }, [loadingUser, validateUser]);

    if (loadingUser) {
        <div className="flex justify-center items-center h-screen w-screen">Loading...</div>
    }

    return children
};

export default UserProtectedRoute;
