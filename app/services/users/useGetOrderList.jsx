import { useState } from "react";


const useGetOrderList = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [errorOrder, setErrorOrder] = useState(null);
    const userOrder = async () => {

        try {
            setOrderDetails(null);
            setErrorOrder(null);

            const request = await fetch('/api/order/userOrder', {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include"

            });
            const update = await request.json();

            if (request.ok) {
                setOrderDetails(update.data);
            } else {
                setErrorOrder(list.message);
            }
        } catch (error) {
            setErrorOrder(error.message);
        }
    };
    return {
        orderDetails,
        errorOrder,
        userOrder
    };
};

export default useGetOrderList;
