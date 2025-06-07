'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { errorToast } from '../../../reuseComponents/ReactToast'
import { usePaymentContext } from '../../../ContextAPI/PaymentContext'
const page = () => {
    const params = useParams();
    const orderId = params?.id;
    const router = useRouter()
    const [failOrder, setFailOrder] = useState(null)
    const [errorFail, setErrorFail] = useState(null)

    const { setShowPaymentDialogue } = useContext(usePaymentContext)
    const getFailPayment = async (orderId) => {
        try {
            setErrorFail(null)
            setFailOrder(null)
            const request = await fetch(`/api/payment/esewa/failureInformation`, {
                methodL: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const info = await request.json()
            if (request?.ok) {
                setFailOrder(info.message)
            }
            else {
                setErrorFail(info.message)
            }
        }
        catch (error) {
            setErrorFail(error.message)
        }
    }

    useEffect(() => {
        if (orderId) {
            getFailPayment()
        }

    }, [orderId])

    useEffect(() => {
        if (failOrder) {
            router.push('/')
            setShowPaymentDialogue(prev => ({ ...prev, showSuccess: false, showFail: true }))
        }
        if (errorFail

        ) {
            errorToast(errorFail)
        }
    }, [failOrder, errorFail])

    return (
        <></>
    )
}

export default page