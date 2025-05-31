import { CloudDrizzle } from "lucide-react";
import { useState } from "react";


const useAddToCart = () => {
    const [successCart, setSuccessCart] = useState(null);
    const [errorCart, setErrorCart] = useState(null);
    const getCart = async (foodId, quantity, prize, name, image) => {
        console.log(image)
        try {
            setSuccessCart(null);
            setErrorCart(null);
            const request = await fetch('/api/user/cartData', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ foodId, quantity, prize, name, image }),
                credentials: 'include'

            });
            const update = await request.json();

            if (request.ok) {
                setSuccessCart(update.message);
            } else {
                setErrorCart(update.message);
            }
        } catch (error) {
            setErrorCart(error.message);
        }
    };
    return {
        successCart,
        errorCart,
        getCart
    };
};

export default useAddToCart;
