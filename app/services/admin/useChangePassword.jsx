import { CloudDrizzle } from "lucide-react";
import { useState } from "react";


const useChangePassword = () => {
    const [successPassword, setSuccessPassword] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const passwordUpate = async (form) => {
        console.log(form)
        try {
            setSuccessPassword(null);
            setErrorPassword(null);
            const request = await fetch(`/api/admin/update-password`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(form),
                credentials: 'include'

            });
            const list = await request.json();

            if (request.ok) {
                setSuccessPassword(list.message);
            } else {
                setErrorPassword(list.message);
            }
        } catch (error) {
            setErrorPassword(error.message);
        }
    };
    return {
        successPassword,
        errorPassword,
        passwordUpate
    };
};

export default useChangePassword;
