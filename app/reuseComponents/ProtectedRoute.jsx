"use client";
import { useEffect, useContext, useState } from "react";
import { userContext } from "../ContextAPI/IsAuthContext";
import { usePathname, useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
    const router = useRouter()
    const { authUser, loading } = useContext(userContext);
    const path = usePathname()

    console.log(authUser, "authUser")
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (loading) return;


        if (!authUser && path.startsWith("/admin")) {
            router.push('/admin')
        } else {

            if (path === "/admin") {
                router.push("/admin/dashboard");
            }
            else {
                router.push(path)
            }
        }
    }, [authUser, loading]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen w-screen">Loading...</div>
    }

    return children
};

export default ProtectedRoute;
