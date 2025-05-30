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

    console.log(validateUser, "authUser")
    useEffect(() => {
        if (loading) return;


        if (!validateUser && (path.startsWith("/cart") || path === '/order')) {
            router.push('/')
            setShowLogIn(true)
        } else {
            router.push(path)

        }
    }, [loadingUser, validateUser]);

    if (loading) {
        <div className="flex justify-center items-center h-screen w-screen">Loading...</div>
    }

    return children
};

export default UserProtectedRoute;
