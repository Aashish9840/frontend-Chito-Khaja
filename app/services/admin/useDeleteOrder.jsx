import { useState } from "react";


const useDeleteOrder = () => {
    const [successOrderDelete, setSuccessOrderDelete] = useState(null);
    const [errorOrderDelete, setErrorOrderDelete] = useState(null);
    const orderDelete = async (id, password) => {
        try {
            setSuccessOrderDelete(null);
            (null);
            const request = await fetch(`/api/order/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: password, id: id }),
            });
            const list = await request.json();

            if (request.ok) {
                setSuccessOrderDelete(list.message);
            } else {
                (list.message);
            }
        } catch (error) {
            (error.message);
        }
    };
    return {
        successOrderDelete,
        errorOrderDelete,
        orderDelete
    };
};

export default useDeleteOrder;
