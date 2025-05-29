import { useState } from "react";


const useUserSignUp = () => {
    const [successSignUp, setSuccessSignUp] = useState(null);
    const [errorSignUp, setErrorSignUp] = useState(null);
    const getSignUp = async (form) => {

        try {
            setSuccessSignUp(null);
            setErrorSignUp(null);

            const request = await fetch('/api/user/register', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(form)

            });
            const update = await request.json();

            if (request.ok) {
                setSuccessSignUp(update.message);
            } else {
                setErrorSignUp(list.message);
            }
        } catch (error) {
            setErrorSignUp(error.message);
        }
    };
    return {
        successSignUp,
        errorSignUp,
        getSignUp
    };
};

export default useUserSignUp;
