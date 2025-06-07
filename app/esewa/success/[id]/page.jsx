'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { errorToast } from '../../../reuseComponents/ReactToast'
import { usePaymentContext } from '../../../ContextAPI/PaymentContext'
const page = () => {
    const params = useParams();
    const orderId = params?.id;
    const router = useRouter()
    const [orderInfo, setOrderInfo] = useState(null)
    const [errorOrderInfo, setErrorOrderInfo] = useState(null)

    const { setSucccessPayment, setShowPaymentDialogue } = useContext(usePaymentContext)
    const getOrderDetails = async (orderId) => {
        try {
            setErrorOrderInfo(null)
            setOrderInfo(null)
            const request = await fetch(`/api/payment/esewa/successInformation/${orderId}`, {
                methodL: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const info = await request.json()
            if (request?.ok) {
                setOrderInfo(info.data)
            }
            else {
                setErrorOrderInfo(info.message)
            }
        }
        catch (error) {
            setErrorOrderInfo(error.message)
        }
    }

    useEffect(() => {
        if (orderId) {
            getOrderDetails(orderId)
        }

    }, [orderId])

    useEffect(() => {
        if (orderInfo) {
            router.push('/')
            setSucccessPayment(orderInfo)
            setShowPaymentDialogue(prev => ({ ...prev, showSuccess: true, showFail: false }))
        }
        if (errorOrderInfo

        ) {
            errorToast(errorOrderInfo)
        }
    }, [orderInfo, errorOrderInfo])

    return (
        <></>
    )
}

export default page