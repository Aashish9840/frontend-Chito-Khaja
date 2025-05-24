import { useState } from "react";


const useGetAdminInfo = () => {
    const [adminInfo, setAdminInfo] = useState(null);
    const [errorAdminInfo, setErrorAdminInfor] = useState(null);
    const getAdminInfo = async () => {
        try {
            setAdminInfo(null);
            setErrorAdminInfor(null);
            const request = await fetch(`/api/admin/userInformation`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            const list = await request.json();

            if (request.ok) {
                setAdminInfo(list.data);
            } else {
                setErrorAdminInfor(list.message);
            }
        } catch (error) {
            setErrorAdminInfor(error.message);
        }
    };
    return {
        adminInfo,
        errorAdminInfo,
        getAdminInfo
    };
};

export default useGetAdminInfo;
