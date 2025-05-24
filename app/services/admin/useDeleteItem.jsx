import { useState } from "react";


const useDeleteItem = () => {
    const [successDelete, setDeleteSuccess] = useState(null);
    const [errorDelete, setErrorDelete] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const getDeleteFood = async (id, password) => {

        try {
            setDeleteSuccess(null);
            setLoadingDelete(false);
            setErrorDelete(null);
            const request = await fetch(`/api/food/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: password })
            });

            const list = await request.json();
            if (request.ok) {
                setDeleteSuccess(list.message);
            } else {
                setErrorDelete(list.message);
            }
        } catch (error) {
            setErrorDelete(error.message);
        }
        finally {
            setLoadingDelete(true)
        }
    };
    return {
        successDelete,
        loadingDelete,
        errorDelete,
        getDeleteFood
    };
};

export default useDeleteItem;
