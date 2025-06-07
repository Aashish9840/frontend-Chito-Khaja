'use client'
import React, { createContext, useState } from 'react'
export const usePaymentContext = createContext()
const PaymentContext = ({ children }) => {
    const [successPayment, setSucccessPayment] = useState(null)
    const [failPayment, setFailPayment] = useState(null)
    const [showPaymentDialogue, setShowPaymentDialogue] = useState({
        showSuccess: true,
        showFail: false,
    })
    return (
        <usePaymentContext.Provider value={{ successPayment, setSucccessPayment, failPayment, setFailPayment, showPaymentDialogue, setShowPaymentDialogue }}>
            {children}

        </usePaymentContext.Provider>
    )
}

export default PaymentContext