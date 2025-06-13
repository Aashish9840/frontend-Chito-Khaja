import { useState } from "react";


const useUpdateOrderStatus = () => {
    const [updateOrder, setUpdateOrder] = useState(null);
    const [errorOrderUpdate, setErrorOrderUpdate] = useState(null);
    const getOrderUpdate = async (orderId, status) => {
        try {
            setUpdateOrder(null);
            setErrorOrderUpdate(null);
            const request = await fetch(`/api/order/updateStatus`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderId: orderId, status: status }),
                credentials: "include"
            });
            const list = await request.json();

            if (request.ok) {
                setUpdateOrder(list.message);
            } else {
                setErrorOrderUpdate(list.message);
            }
        } catch (error) {
            setErrorOrderUpdate(error.message);
        }
    };
    return {
        updateOrder,
        errorOrderUpdate,
        getOrderUpdate
    };
};

export default useUpdateOrderStatus;
