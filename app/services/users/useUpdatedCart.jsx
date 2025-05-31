import { useState } from "react";


const useUpdatedCart = () => {
    const [successUpdate, setSuccessUpdate] = useState(null);
    const [errorUpdate, setErrorUpdate] = useState(null);
    const mutatedCart = async (cartItems) => {

        try {
            setSuccessUpdate(null);
            setErrorUpdate(null);

            const request = await fetch('/api/user/updateCartData', {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(cartItems),
                credentials: "include"

            });
            const update = await request.json();

            if (request.ok) {
                setSuccessUpdate(update.message);
            } else {
                setErrorUpdate(list.message);
            }
        } catch (error) {
            setErrorUpdate(error.message);
        }
    };
    return {
        successUpdate,
        errorUpdate,
        mutatedCart
    };
};

export default useUpdatedCart;
