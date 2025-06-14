import { useState } from "react";


const useLogOut = () => {
    const [successLogOut, setSuccessLogout] = useState(null);
    const [errorLogOut, setErrorLogOut] = useState(null);
    // const [loadingDelete, setLoadingDelete] = useState(false);
    const adminLogOut = async (id, password) => {

        try {
            setSuccessLogout(null);
            setErrorLogOut(null);
            const request = await fetch(`/api/admin/adminLogOut`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });

            const list = await request.json();
            if (request.ok) {
                setSuccessLogout(list.message);
            } else {
                setErrorLogOut(list.message);
            }
        } catch (error) {
            setErrorLogOut(error.message);
        }

    };
    return {
        errorLogOut,
        successLogOut,
        adminLogOut
    };
};

export default useLogOut;
