'use client'
import React, { useContext, useEffect } from 'react'
import Header from '../reuseComponents/Header'
import { singleFood } from '../ContextAPI/SingleFoodContext'
import Image from 'next/image'
import useGetSingleFood from '../services/users/useGetSingleFood'
import { useSearchParams } from 'next/navigation'
import { Minus, Plus } from 'lucide-react'
import useGetAllFood from '../services/users/useGetAllFood'
import FoodCart from '../components/FoodCart'
import Footer from '../components/Footer'

const page = () => {
    const params = useSearchParams()
    const foodId = params.get("foodId")
    const imagePath = process.env.NEXT_PUBLIC_IMAGE
    const { singleFood, errorSingleFood, getSingleFood } = useGetSingleFood()
    const { successFoodList, errorFood, getAllFood } = useGetAllFood()

    useEffect(() => {
        if (foodId) {
            getSingleFood(foodId)
        }
    }, [foodId])

    useEffect(() => {
        if (singleFood) {
            getAllFood(singleFood.category)
        }
    }, [singleFood])
    console.log(successFoodList, "success")

    return (
        <div className='container'>
            <Header />
            <section className='flex justify-between flex-col sm:flex-row gap-4 lg:gap-20 items-center py-6 h-fit sm:h-[60vh] lg:h-[90vh]'>
                <div className='w-full sm:w-[60%] lg:w-[50%] h-full'>
                    <Image
                        src={`${imagePath}/${singleFood?.image}`}
                        width={300}
                        height={300}
                        alt='food image'
                        className='w-full h-full rounded-lg object-center object-cover'
                    />
                </div>
                <div className='h-full w-full sm:w-[60%] lg:[50%] flex flex-col gap-3 lg:gap-10'>
                    <section className='flex gap-1 flex-col'>
                        <h1 className='text-3xl font-semibold font-dm_sans'>{singleFood?.name}</h1>
                        <h2 className='text-[16px] font-medium font-dm_sans my-2'>Rs. {singleFood?.prize}</h2>
                    </section>
                    <section>
                        <h1 className='text-[16px] font-dm_sans'>Quantity</h1>
                        <div className='flex gap-4 my-2 items-center w-[150px] h-fit py-2 px-2 justify-around border border-gray-400 rounded-sm'>
                            <Minus size={20} className='cursor-pointer' />
                            <h1>01</h1>
                            <Plus size={20} className='cursor-pointer' />
                        </div>
                    </section>
                    <section className='flex gap-1 flex-col'>
                        <h1 className='text-[16px] font-medium font-dm_sans my-2'>Description</h1>
                        <h2 className='text-[16px] font-dm_sans'>{singleFood?.description}</h2>
                    </section>
                    <button className='py-3 bg-black/90 text-white text-base font-medium hover:bg-black/80 rounded-lg w-full font-dm_sans'>Add to Cart</button>
                </div>

            </section>

            <section className='my-16'>
                <h1 className='text-3xl font-commissioner font-semibold'>Recommended for you</h1>
                <div className='grid my-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 h-fit w-full' id="foodlist">
                    {successFoodList?.map((food, index) => (
                        <FoodCart food={food} index={index} />
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default page