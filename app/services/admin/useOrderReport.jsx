import { useState } from "react";


const useOrderReport = () => {
    const [orderReport, setOrderReport] = useState(null);
    const [errorOrderReport, setErrorOrderReport] = useState(null)
    const orderReportDetail = async (id, password) => {

        try {
            setOrderReport(null);
            setErrorOrderReport(null)
            const request = await fetch(`/api/order/orderReport`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const list = await request.json();
            if (request.ok) {
                setOrderReport(list.data);
            } else {
                setErrorOrderReport(list.message);
            }
        } catch (error) {
            setErrorOrderReport(error.message);
        }

    };
    return {
        orderReport,

        errorOrderReport,
        orderReportDetail
    };
};

export default useOrderReport;
