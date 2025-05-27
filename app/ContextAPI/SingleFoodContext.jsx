'use client'
import React from 'react'
import { createContext } from 'vm'


const singleFood = createContext()
const SingleFoodContext = ({ children }) => {

    const [foodDescription, setFoodDescription] = useState(null)
    return (
        <singleFood.Provider value={{ foodDescription, setFoodDescription }}>

            {children}

        </singleFood.Provider>
    )
}

export default SingleFoodContext