import { CloudDrizzle } from "lucide-react";
import { useState } from "react";

const useGetEsewaPayment = () => {
    const [esewaDetail, setEsewaDetail] = useState(null);
    const [erroresewaDetail, setErroresewaDetail] = useState(null);
    const hitEsewaPayment = async (orderId) => {
        try {
            setEsewaDetail(null);
            setErroresewaDetail(null);
            const request = await fetch(`/api/payment/esewa/getPayment?orderId=${orderId}`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                },
            });
            const update = await request.json();

            if (request.ok) {
                setEsewaDetail(update.data);
            } else {
                setErroresewaDetail(update.message);
            }
        } catch (error) {
            setErroresewaDetail(error.message);
        }
    };
    return {
        esewaDetail,
        erroresewaDetail,
        hitEsewaPayment,
    };
};

export default useGetEsewaPayment;
