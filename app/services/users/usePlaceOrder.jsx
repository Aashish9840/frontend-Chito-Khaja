import { CloudDrizzle } from "lucide-react";
import { useState } from "react";

const usePlaceOrder = () => {
    const [successCart, setSuccessCart] = useState(null);
    const [errorCart, setErrorCart] = useState(null);
    const [invoiceId, setInvoiceId] = useState(null)
    const placeOrder = async (form) => {
        try {
            setSuccessCart(null);
            setErrorCart(null);
            setInvoiceId(null);
            const request = await fetch('/api/order/placeOrder', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(form),
                credentials: 'include'

            });
            const update = await request.json();

            if (request.ok) {
                setSuccessCart(update.message);
                setInvoiceId(update.orderId)
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
        placeOrder,
        invoiceId
    };
};

export default usePlaceOrder;
