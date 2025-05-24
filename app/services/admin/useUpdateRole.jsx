import { useState } from "react";


const useUpdateRole = () => {
    const [successRoleUpdate, setSuccessRoleUpdate] = useState(null);
    const [errorRoleUpdate, setErrorRoleUpdate] = useState(null);
    const roleUpdate = async (id, role) => {
        console.log(id, role, "id and role")
        try {
            setSuccessRoleUpdate(null);

            setErrorRoleUpdate(null);
            const request = await fetch(`/api/admin/update-role`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: id, updateRole: role })
            });

            const list = await request.json();
            if (request.ok && list.message) {
                setSuccessRoleUpdate(list.message);
            } else {
                setErrorRoleUpdate(list.message);
            }
        } catch (error) {
            setErrorRoleUpdate(error.message);
        }

    };
    return {
        successRoleUpdate,
        errorRoleUpdate,
        roleUpdate
    };
};

export default useUpdateRole;
