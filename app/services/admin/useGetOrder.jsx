import { useState } from "react";


const useGetOrder = () => {
    const [order, setOrder] = useState(null);
    const [errorOrder, setErrorOrder] = useState(null);
    const getOrder = async (id, password) => {
        try {
            setOrder(null);
            setErrorOrder(null);
            const request = await fetch(`/api/order/getOrder`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const list = await request.json();

            if (request.ok) {
                setOrder(list.data);
            } else {
                setErrorOrder(list.message);
            }
        } catch (error) {
            setErrorOrder(error.message);
        }
    };
    return {
        order,
        errorOrder,
        getOrder
    };
};

export default useGetOrder;
