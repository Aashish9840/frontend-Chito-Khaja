'use client'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../reuseComponents/Header'
import { userValidate } from '../ContextAPI/IsUserAuthContext'
import Image from 'next/image'
import { X } from 'lucide-react'
import useUpdatedCart from '../services/users/useUpdatedCart'

const page = () => {
    const imagePath = process.env.NEXT_PUBLIC_IMAGE
    const [product, setProduct] = useState([])
    const [updatedCart, setUpdatedCart] = useState(null)
    const { validateUser, setCallUserValidate } = useContext(userValidate)
    const { successUpdate, errorUpdate, mutatedCart } = useUpdatedCart()
    useEffect(() => {
        if (validateUser?.cardData) {
            const arry = []
            validateUser?.cardData?.forEach(element => {
                arry.push(element)
            });
            setProduct(arry)
        }
    }, [validateUser?.cardData])

    const handleRemove = (id) => {
        setProduct((prevProducts) => {
            const updated = prevProducts
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0);

            setUpdatedCart(updated);
            return updated;
        });
    };
    // api hit for cartData update after 5 secs based on users remove action
    useEffect(() => {
        if (updatedCart !== null) {
            const time = setTimeout(() => {

                mutatedCart(updatedCart)

            }, 5000)
            return () => clearTimeout(time)
        }

    }, [updatedCart]);
    // recalling the validateuser for user update
    useEffect(() => {
        if (successUpdate) {
            setCallUserValidate(prev => !prev)
            setUpdatedCart(null)
        }
    }, [successUpdate])
    return (
        <div className='container px-4 sm:px-0'>
            <Header />
            <main className='py-8'>
                <div className='w-full h-[40vh] overflow-y-auto custom-scroll'>
                    <table className='w-full' >
                        <thead className='w-full border-b-2 border-b-gray-100'>
                            <tr>
                                <td className='text-base font-dm_sans font-medium text-gray-500 pb-3 px-4 '>Image</td>
                                <td className='text-base font-dm_sans font-medium text-gray-500 pb-3 px-4 '>Food</td>
                                <td className='text-base font-dm_sans font-medium text-gray-500 pb-3 px-4'>Price</td>

                                <td className='text-base font-dm_sans font-medium text-gray-500 pb-3 px-4'>Quantity</td>

                                <td className='text-base font-dm_sans font-medium text-gray-500 pb-3 px-4'>Total Price</td>

                                <td className='text-base font-dm_sans font-medium text-gray-500 pb-3 px-4'>
                                    Remove
                                </td>
                            </tr>

                        </thead>

                        <tbody >
                            {
                                product?.map((items, index) => (

                                    <tr key={index} className='mt-4 w-full'>
                                        <td className='text-base font-dm_sans py-1 border-b-2 border-b-gray-100   px-4 '>
                                            <Image
                                                src={`${imagePath}/${items?.image}`}
                                                height={200}
                                                width={200}
                                                alt='food Image'
                                                className='h-[55px] w-[55px] rounded-md'
                                            />
                                        </td>



                                        <td className='text-base font-dm_sans py-1 border-b-2 border-b-gray-100   px-4 '>{items.name}</td>
                                        <td className='text-base font-dm_sans py-1 border-b-2 border-b-gray-100   px-4'>Rs. {items.prize}</td>

                                        <td className='text-base font-dm_sans  py-1 border-b-2 border-b-gray-100   px-4'>{items.quantity} Qtn</td>

                                        <td className='text-base font-dm_sans py-1 border-b-2 border-b-gray-100   px-4'>Rs. {items.quantity * items.prize}</td>
                                        <td className='text-base font-dm_sans py-1 border-b-2 border-b-gray-100   px-4' onClick={() => handleRemove(items.id)}>
                                            <X size={18} className='cursor-pointer' />
                                        </td>



                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>


            </main>
        </div>
    )
}

export default page