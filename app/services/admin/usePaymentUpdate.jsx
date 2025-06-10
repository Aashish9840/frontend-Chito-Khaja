import { useState } from "react";


const usePaymentUpdate = () => {
    const [updatePayment, setUpdatePayment] = useState(null);
    const [errorPaymentUpdate, setErrorPaymentUpdate] = useState(null);
    const getPaymentUpdate = async (orderId, status) => {
        try {
            setUpdatePayment(null);
            setErrorPaymentUpdate(null);
            const request = await fetch(`/api/order/paymentUpdate`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderId: orderId, status: status })
            });
            const list = await request.json();

            if (request.ok) {
                setUpdatePayment(list.message);
            } else {
                setErrorPaymentUpdate(list.message);
            }
        } catch (error) {
            setErrorPaymentUpdate(error.message);
        }
    };
    return {
        updatePayment,
        errorPaymentUpdate,
        getPaymentUpdate
    };
};

export default usePaymentUpdate;
