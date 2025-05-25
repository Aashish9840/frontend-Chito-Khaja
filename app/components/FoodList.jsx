'use client'
import React, { useEffect, useRef, useState } from 'react'
import useGetAllFood from "../services/users/useGetAllFood"
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
const FoodList = () => {
    const imagePath = process.env.NEXT_PUBLIC_IMAGE
    const scrollRef = useRef(null);
    const itemWidth = 150;
    const [category, setCategory] = useState(null)
    const { successFoodList, errorFood, getAllFood } = useGetAllFood()


    const scrollNext = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += itemWidth;
        }
    };

    const scrollPrev = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= itemWidth;
        }
    };
    useEffect(() => {
        if (category) {
            getAllFood(category)
        } else {

            getAllFood()
        }
    }, [category])


    const menu = [{ title: "Noodles", image: "/menu/noodles.jpg" }, { title: "Burger", image: "/menu/burger.jpg" }, { title: "Cake", image: "/menu/cake.jpg" }, { title: "Dessert", image: "/menu/dessert.jpg" }, { title: "Breakfast", image: "/menu/breakfast.jpg" }, { title: "Chicken", image: "/menu/chicken.jpg" }, { title: "French Fries", image: "/menu/french_fries.jpg" }, { title: "Salad", image: "/menu/salad.jpg" }, { title: "Fried Rice", image: "/menu/fried_rice.jpg" }, { title: "Momo", image: "/menu/momo.jpg" }, { title: "Pizza", image: "/menu/pizza.jpg" }, { title: "Salad", image: "/menu/salad.jpg" }, { title: "Sandwitch", image: "/menu/sandwich.jpg" }, { title: "Sausage", image: "/menu/sausage.jpg" }]
    return (
        <div className='container py-5'>

            <div className='relative my-3 md:my-10 flex gap-2 flex-col'>
                <h1 className='text-[18px] font-bold font-liber md:text-2xl '>Discover Our Tasty Menu</h1>
                <h2 className='text-base font-inter text-gray-600'>From crispy bites to hearty meals, explore a variety of delicious options made fresh for every craving. Whether you're in the mood for traditional flavors or modern favorites, Chito Khaja has something to satisfy every appetite.</h2>
                <div className='relative my-6'>
                    <div className=' flex mx-[30px] gap-[30px] items-center overflow-x-hidden scroll-smooth' ref={scrollRef}>
                        {menu.map((menuItem, index) => (
                            <div key={index} className='w-fit flex flex-col gap-3 flex-shrink-0'>
                                <Image
                                    src={menuItem.image}
                                    width={200}
                                    height={200}
                                    alt='menu-image'
                                    className='h-[120px] w-[120px] rounded-[50%]'
                                />
                                <h1 className='text-center font-dm_sans font-medium text-base w-full'>{menuItem.title}</h1>
                            </div>
                        ))}
                    </div>
                    <button className='absolute top-[35%] left-0 z-[10] p-[4px] bg-bulk-white rounded-full '>
                        <ChevronLeft size={20} className="text-green-600" onClick={scrollPrev} />

                    </button>
                    <button className='absolute top-[35%] right-0 z-[10] p-[4px] rounded-full bg-bulk-white'>
                        <ChevronRight size={20} className="text-green-600" onClick={scrollNext} />

                    </button>

                </div>

            </div>
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