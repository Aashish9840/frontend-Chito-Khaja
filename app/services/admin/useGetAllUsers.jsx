import { useState } from "react";


const useGetAllUsers = () => {
    const [users, setUsers] = useState(null);
    const [errorUser, setErrorUser] = useState(null);
    // const [loadingDelete, setLoadingDelete] = useState(false);
    const getUser = async (id, password) => {

        try {
            setUsers(null);
            setErrorUser(null);
            const request = await fetch(`/api/admin/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });

            const list = await request.json();
            if (request.ok) {
                setUsers(list.data);
            } else {
                setErrorUser(list.message);
            }
        } catch (error) {
            setErrorUser(error.message);
        }

    };
    return {
        users,
        errorUser,
        getUser
    };
};

export default useGetAllUsers;
