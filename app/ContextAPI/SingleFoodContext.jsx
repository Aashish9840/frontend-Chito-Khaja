'use client'
import React, { createContext, useState } from 'react'


export const singleFood = createContext()
const SingleFoodContext = ({ children }) => {

    const [foodDescription, setFoodDescription] = useState(null)
    return (
        <singleFood.Provider value={{ foodDescription, setFoodDescription }}>

            {children}

        </singleFood.Provider>
    )
}

export default SingleFoodContext


