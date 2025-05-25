'use client'
import React, { useEffect } from 'react'
import useGetAllFood from "../services/users/useGetAllFood"
import Image from 'next/image'
const FoodList = () => {
    const imagePath = process.env.NEXT_PUBLIC_IMAGE

    const { successFoodList, errorFood, getAllFood } = useGetAllFood()
    useEffect(() => {
        getAllFood()
    }, [])
    return (
        <div className='container py-5'>
            <h1 className='text-xl md:text-2xl font-liber font-semibold font-bulk-white mb-6'>Our Favorite Dishes</h1>
            <div className='grid my-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 h-fit w-full'>
                {successFoodList?.map((food, index) => (
                    <div className='flex py-2 flex-col gap-2 border-bulk-white border-2 shadow-md transition-all transform duration-300 ease-in hover:scale-105 rounded-md px-4' key={index}>
                        <Image
                            src={`${imagePath}/${food?.image}`}
                            height={200}
                            width={200}
                            alt="food image"
                            className="h-[250px] w-[100%] border rounded-md my-2"
                        />
                        <section>
                            <h1 className='text-xl font-dm_sans font-medium'>{food.name}</h1>
                        </section>
                        <h1 className='text-[16px] text-gray-700 font-dm_sans'>{`${food.description.split(" ").slice(0, 7).join(" ")}...`}</h1>
                        <section className='flex gap-12 items-center'>
                            <h1 className='text-[18px] font-semibold text-gray-800 font-dm_sans'>Rs {food.prize}</h1>
                            <h2 className='text-[16px] font-dm_sans text-gray-700'>Discount by 2%</h2>

                        </section>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default FoodList