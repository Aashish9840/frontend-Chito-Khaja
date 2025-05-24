import { useState } from "react";


const useUpdateInformation = () => {
    const [successInfoUpdate, setSuccessInfoUpdate] = useState(null);
    const [errorInfoUpdate, setErrorInfoUpdate] = useState(null);
    const userInfoUpdate = async (form) => {
        console.log(form, "id and role")
        try {
            setSuccessInfoUpdate(null);

            setErrorInfoUpdate(null);
            const request = await fetch(`/api/admin/update-info`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            });

            const list = await request.json();
            if (request.ok && list.message) {
                setSuccessInfoUpdate(list.message);
            } else {
                setErrorInfoUpdate(list.message);
            }
        } catch (error) {
            setErrorInfoUpdate(error.message);
        }

    };
    return {
        successInfoUpdate,
        errorInfoUpdate,
        userInfoUpdate
    };
};

export default useUpdateInformation;
