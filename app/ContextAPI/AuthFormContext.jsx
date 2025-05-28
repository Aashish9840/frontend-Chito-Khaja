'use client'
import React, { createContext, useState } from 'react'


export const AuthForm = createContext()
const AuthFormContext = ({ children }) => {

    const [showSignUp, setShowSignUp] = useState(false)
    const [showLogIn, setShowLogIn] = useState(false)

    return (
        <AuthForm.Provider value={{ showSignUp, setShowSignUp, showLogIn, setShowLogIn }}>

            {children}

        </AuthForm.Provider>
    )
}
export default AuthFormContext


