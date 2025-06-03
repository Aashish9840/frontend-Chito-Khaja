import { useState } from "react";


const useUserSignIn = () => {
    const [successSignIn, setSuccessSignIn] = useState(null);
    const [errorSignIn, setErrorSignIn] = useState(null);
    const getSignIn = async (form) => {

        try {
            setSuccessSignIn(null);
            setErrorSignIn(null);

            const request = await fetch('/api/user/login', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(form)

            });
            const update = await request.json();

            if (request.ok) {
                setSuccessSignIn(update.message);
            } else {
                setErrorSignIn(update.message);
            }
        } catch (error) {
            setErrorSignIn(error.message);
        }
    };
    return {
        successSignIn,
        errorSignIn,
        getSignIn
    };
};

export default useUserSignIn;
