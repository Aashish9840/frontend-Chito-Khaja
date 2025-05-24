import { useState } from "react";


const useDeleteUser = () => {
    const [successUserDelete, setSucessUserDelete] = useState(null);
    const [errorUserDelete, setErrorUserDelete] = useState(null);
    const getUserDelete = async (id, password) => {
        try {
            setSucessUserDelete(null);
            setErrorUserDelete(null);
            const request = await fetch(`/api/admin/delete-user`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: password, id: id }),
                credentials: "include"
            });
            const list = await request.json();

            if (request.ok) {
                setSucessUserDelete(list.message);
            } else {
                setErrorUserDelete(list.message);
            }
        } catch (error) {
            setErrorUserDelete(error.message);
        }
    };
    return {
        successUserDelete,
        errorUserDelete,
        getUserDelete
    };
};

export default useDeleteUser;
