import { imageConfigDefault } from 'next/dist/shared/lib/image-config'
import Image from 'next/image'
import React from 'react'

const MenuSection = () => {

    const menu = [{ title: "Noodles", image: "/Hero/food_banner_1.jpg" }, { title: "Noodles", image: "/Hero/food_banner_1.jpg" }, { title: "Noodles", image: "/Hero/food_banner_1.jpg" }, { title: "Noodles", image: "/Hero/food_banner_1.jpg" }, { title: "Noodles", image: "/Hero/food_banner_1.jpg" }, { title: "Noodles", image: "/Hero/food_banner_1.jpg" }, { title: "Noodles", image: "/Hero/food_banner_1.jpg" }, { title: "Salad", image: "/Hero/food_banner_1.jpg" }, { title: "Burger", image: "/Hero/food_banner_1.jpg" }, { title: "Pizza", image: "/Hero/food_banner_1.jpg" }, { title: "Chicken", image: "/Hero/food_banner_1.jpg" }, { title: "Cake", image: "/Hero/food_banner_1.jpg" }, { title: "Sandwitch", image: "/Hero/food_banner_1.jpg" }]
    return (
        <div className='container my-3 md:my-10 flex gap-2 flex-col'>
            <h1 className='text-[18px] font-bold font-liber md:text-2xl '>Discover Our Tasty Menu</h1>
            <h2 className='text-base font-inter text-gray-600'>From crispy bites to hearty meals, explore a variety of delicious options made fresh for every craving. Whether you're in the mood for traditional flavors or modern favorites, Chito Khaja has something to satisfy every appetite.</h2>
            <div className='flex px-10 gap-[40px] my-6 items-center overflow-x-auto'>
                {menu.map((menuItem, index) => (
                    <div key={index} className='w-fit flex flex-col gap-3 flex-shrink-0'>
                        <Image
                            src={menuItem.image}
                            width={200}
                            height={200}
                            alt='menu-image'
                            className='h-[150px] w-[150px] rounded-[50%]'
                        />
                        <h1 className='text-center font-dm_sans text-base w-full'>{menuItem.title}</h1>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default MenuSection