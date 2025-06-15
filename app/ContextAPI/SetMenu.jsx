'use client'
import React, { createContext, useState } from 'react'
export const useMenu = createContext()
const SetMenu = ({ children }) => {
    const [customMenuStyle, setCustomMenuStyle] = useState('FoodList')
    return (
        <useMenu.Provider value={{ customMenuStyle, setCustomMenuStyle }}>
            {children}

        </useMenu.Provider>
    )
}

export default SetMenu