'use client'
import React, { createContext, useEffect, useState } from 'react'


export const userValidate = createContext()
const IsUserAuthContext = ({ children }) => {

    const [loadingUser, setLoadingUser] = useState(true);
    const [validateUser, setValidateUser] = useState(false);
    const [errorValidate, setErrorValidate] = useState(false)
    const [callUserValidate, setCallUserValidate] = useState(false)

    useEffect(() => {
        async function checkAuth() {
            try {
                setLoadingUser(true)
                setValidateUser(null)
                setErrorValidate(null)
                const res = await fetch('/api/user/isAuth', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "appilcation/json"
                    },
                    credentials: 'include',
                });
                const user = await res.json()
                if (res.ok && user.data) {
                    setValidateUser(user.data)
                } else {
                    setErrorValidate(user.message)
                }
            } catch (error) {
                setErrorValidate(error.message)
            } finally {
                setLoadingUser(false);
            }
        }
        checkAuth();
    }, [callUserValidate]);

    return (
        <userValidate.Provider value={{ loadingUser, validateUser, errorValidate, callUserValidate, setCallUserValidate }}>

            {children}

        </userValidate.Provider>
    )
}
export default IsUserAuthContext


