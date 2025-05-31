import { CloudDrizzle } from "lucide-react";
import { useState } from "react";


const useGetLogOut = () => {
    const [successLogOut, setSuccessLogOut] = useState(null);
    const [errorLogOut, setErrorLogOut] = useState(null);
    const signOut = async (category) => {

        try {
            setSuccessLogOut(null);
            setErrorLogOut(null);

            const baseUrl = new URL('/api/user/logout', window.location.origin)
            if (category) {
                baseUrl.searchParams.append("category", category)
            }

            const request = await fetch(baseUrl.toString(), {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include"
            });
            const update = await request.json();

            if (request.ok) {
                setSuccessLogOut(update.message);
            } else {
                setErrorLogOut(list.message);
            }
        } catch (error) {
            setErrorLogOut(error.message);
        }
    };
    return {
        successLogOut,
        errorLogOut,
        signOut
    };
};

export default useGetLogOut;
