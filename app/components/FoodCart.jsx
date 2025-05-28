import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const FoodCart = ({ food }) => {
    const router = useRouter()
    const imagePath = process.env.NEXT_PUBLIC_IMAGE
    return (
        <div className='flex py-2 flex-col gap-2 border-bulk-white border-2 shadow-md rounded-md px-4' onClick={() => { router.push(`/cart?foodId=${food._id}`) }}>

            <div className='h-[250px] w-[100%] overflow-hidden'>
                <Image
                    src={`${imagePath}/${food?.image}`}
                    height={200}
                    width={200}
                    alt="food image"
                    className="h-full w-[100%] border rounded-md transition-all transform duration-300 ease-in hover:scale-105"
                />
            </div>

            <section>
                <h1 className='text-[18px] font-dm_sans font-medium'>{food.name}</h1>
            </section>
            <h1 className='text-[12px] text-gray-700 font-dm_sans'>{`${food.description.split(" ").slice(0, 10).join(" ")}...`}</h1>
            <section className='flex gap-12 items-center'>
                <h1 className='text-[18px] font-semibold text-gray-800 font-dm_sans'>Rs {food.prize}</h1>
                <h2 className='text-[12px] font-dm_sans text-gray-700'>Discount by 2%</h2>
            </section>
            <button className='w-full bg-blue-700 text-white py-2 rounded-md text-center font-medium hover:bg-blue-600'>Add To Cart</button>
        </div>
    )
}

export default FoodCart