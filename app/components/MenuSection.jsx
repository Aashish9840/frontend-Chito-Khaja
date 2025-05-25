'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React, { useRef } from 'react'

const MenuSection = () => {
    const scrollRef = useRef(null);
    const itemWidth = 150;

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

    const menu = [{ title: "Noodles", image: "/menu/noodles.jpg" }, { title: "Burger", image: "/menu/burger.jpg" }, { title: "Cake", image: "/menu/cake.jpg" }, { title: "Dessert", image: "/menu/dessert.jpg" }, { title: "Breakfast", image: "/menu/breakfast.jpg" }, { title: "Chicken", image: "/menu/chicken.jpg" }, { title: "French Fries", image: "/menu/french_fries.jpg" }, { title: "Salad", image: "/menu/salad.jpg" }, { title: "Fried Rice", image: "/menu/fried_rice.jpg" }, { title: "Momo", image: "/menu/momo.jpg" }, { title: "Pizza", image: "/menu/pizza.jpg" }, { title: "Salad", image: "/menu/salad.jpg" }, { title: "Sandwitch", image: "/menu/sandwich.jpg" }, { title: "Sausage", image: "/menu/sausage.jpg" }]
    return (
        <div className='relative container my-3 md:my-10 flex gap-2 flex-col'>
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
    )
}

export default MenuSection