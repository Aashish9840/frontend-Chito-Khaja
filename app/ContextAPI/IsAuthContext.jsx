'use client'
import React, { createContext, useEffect, useState } from 'react'
export const userContext = createContext()
const IsAuthContext = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authUser, setAuthUser] = useState(false);
    const [errorAuth, setErrorAuth] = useState(false)
    const [callContext, setCallContext] = useState(false)

    useEffect(() => {
        async function checkAuth() {
            try {
                setLoading(false)
                setAuthUser(null)
                const res = await fetch('/api/admin/isAuth', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "appilcation/json"
                    },
                    credentials: 'include',
                });
                const user = await res.json()
                if (res.ok && user.data) {
                    setAuthUser(user.data)
                } else {
                    setErrorAuth(user.message)
                }
            } catch (error) {
                setErrorAuth(error.message)
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, [callContext]);

    return (
        <userContext.Provider value={{ loading, authUser, errorAuth, callContext, setCallContext }}>
            {children}
        </userContext.Provider>
    )
}

export default IsAuthContext
