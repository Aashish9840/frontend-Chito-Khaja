import { useState } from "react";


const useGetOrderList = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [latestPdf, setLatestPdf] = useState(null)
    const [errorOrder, setErrorOrder] = useState(null);
    const [successOrder, SetSuccessOrder] = useState(false)
    const userOrder = async (fromDate, toDate) => {

        try {
            setOrderDetails(null);
            setErrorOrder(null);
            setLatestPdf(null)
            SetSuccessOrder(false)

            const request = await fetch(`/api/order/userOrder?fromDate=${fromDate}&&toDate=${toDate}`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include"

            });
            const update = await request.json();

            if (request.ok) {
                setOrderDetails(update.data[0]?.allData);
                setLatestPdf(update.data[0].latestPdf[0]?.pdfFile);
                SetSuccessOrder(true)
                return
            } else {
                setErrorOrder(update.message);
            }
        } catch (error) {
            setErrorOrder(error.message);
        }
    };
    return {
        orderDetails,
        latestPdf,
        errorOrder,
        successOrder,
        userOrder
    };
};

export default useGetOrderList;
