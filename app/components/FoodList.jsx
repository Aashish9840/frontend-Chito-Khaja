'use client'
import React, { useEffect, useRef, useState } from 'react'
import useGetAllFood from "../services/users/useGetAllFood"
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
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

    const handleCategory = (foodTitle) => {

        if (foodTitle === "All Food") {
            setCategory(null)
        }
        else {
            setCategory(foodTitle);
        }

        const el = document.getElementById("foodlist");
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }

    }

    const menu = [{ title: "All Food", image: "/menu/All.jpg" }, { title: "Noodles", image: "/menu/noodles.jpg" }, { title: "Burger", image: "/menu/burger.jpg" }, { title: "Cake", image: "/menu/cake.jpg" }, { title: "Dessert", image: "/menu/dessert.jpg" }, { title: "Breakfast", image: "/menu/breakfast.jpg" }, { title: "Chicken", image: "/menu/chicken.jpg" }, { title: "French Fries", image: "/menu/french_fries.jpg" }, { title: "Salad", image: "/menu/salad.jpg" }, { title: "Fried Rice", image: "/menu/fried_rice.jpg" }, { title: "Momo", image: "/menu/momo.jpg" }, { title: "Pizza", image: "/menu/pizza.jpg" }, { title: "Salad", image: "/menu/salad.jpg" }, { title: "Sandwitch", image: "/menu/sandwich.jpg" }, { title: "Sausage", image: "/menu/sausage.jpg" }]
    return (
        <div className='container py-5'>

            <div className='relative my-3 md:my-10 flex gap-2 flex-col'>
                <h1 className='text-[18px] font-bold font-liber md:text-2xl '>Discover Our Tasty Menu</h1>
                <h2 className='text-base font-inter text-gray-600'>From crispy bites to hearty meals, explore a variety of delicious options made fresh for every craving. Whether you're in the mood for traditional flavors or modern favorites, Chito Khaja has something to satisfy every appetite.</h2>
                <div className='relative my-6'>
                    <div className=' flex mx-[30px] gap-[30px] items-center overflow-x-hidden scroll-smooth' ref={scrollRef}>
                        {menu.map((menuItem, index) => (
                            <div key={index} className='w-fit flex flex-col gap-3 flex-shrink-0 cursor-pointer' onClick={() => handleCategory(menuItem.title)}>
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
            <h1 className='text-xl md:text-2xl font-liber font-semibold font-bulk-white mb-6'>{category ? `${category} Items` : "Our Favorite Dishes"}</h1>
            {
                successFoodList?.length > 0 ?

                    <div className='grid my-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 h-fit w-full' id="foodlist">
                        {successFoodList?.map((food, index) => (
                            <div className='flex py-2 flex-col gap-2 border-bulk-white border-2 shadow-md rounded-md px-4' key={index}>

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
                                <Link href={`/cart?foodId=${food._id}`} className='w-full bg-blue-700 text-white py-2 rounded-md text-center font-medium hover:bg-blue-600'>Add To Cart</Link>
                            </div>
                        ))}

                    </div>
                    : <div className="flex items-center justify-center h-30 bg-white">
                        <div className="flex items-center gap-4 px-6 py-4 border border-gray-200 bg-gray-100 rounded-xl shadow-sm">
                            {/* Icon */}
                            <div className="text-yellow-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" /><path fill="#736767" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m0 9c1.267 0 2.427.473 3.308 1.25a1 1 0 1 1-1.324 1.5A3 3 0 0 0 12 15c-.761 0-1.455.282-1.984.75a1 1 0 1 1-1.323-1.5A5 5 0 0 1 12 13M8.5 8a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m7 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3" /></g></svg>
                            </div>

                            {/* Message */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700">Sorry, no matching food category found</h2>
                                <p className="text-sm text-gray-500">Please look out to another category food</p>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default FoodList