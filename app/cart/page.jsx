'use client'
import React, { useContext } from 'react'
import Header from '../reuseComponents/Header'
import { singleFood } from '../ContextAPI/SingleFoodContext'

const page = () => {
    const { foodDescription } = useContext(singleFood)
    return (
        <div className='container'>
            <Header />

        </div>
    )
}

export default page