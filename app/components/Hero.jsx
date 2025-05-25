'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Hero = () => {
    const heroSlides = [
        {
            title: "Quick Bites, Delivered Fast",
            description: "Satisfy your cravings with lightning-fast snack delivery. Chito Khaja brings fresh, hot meals to your doorstep in minutes."
        },
        {
            title: "Your Favorite Snacks, Anytime At Chito Khaja",
            description: "Explore a variety of mouthwatering snacks and local flavors-all available with just a tap on Chito Khaja."
        },
        {
            title: "Crave It. Tap It. Get It.",
            description: "Ordering snacks has never been easier. Use Chito Khaja to enjoy tasty meals wherever you are, whenever you want."
        },
        {
            title: "Freshness at Your Fingertips",
            description: "We deliver snacks that are always hot, fresh, and flavorful-straight from the kitchen to your comfort zone."
        },
        {
            title: "Hungry? We’re Already on the Way!",
            description: "Don’t wait to eat. With Chito Khaja, your next delicious bite is only a few minutes away. Instant snacks. Zero hassle."
        }
    ];


    const backImage = ["/Hero/food_banner_1.jpg", "/Hero/food_banner_2.jpg", "/Hero/food_banner_3.jpg", "/Hero/food_banner_4g.jpg", "/Hero/food_banner_5.jpg"]
    const [heroIndex, setHeroIndex] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setHeroIndex((prev) => {
                if (prev < 4) {
                    return prev + 1
                }
                else {
                    return prev = 0
                }
            })
        }, 3000)
        return () => clearTimeout(timer);
    }, [heroIndex])
    console.log(heroIndex)
    return (
        <div className='container my-4 h-[40vh] md:h-[60vh] lg:h-[85vh] relative'>
            <div className='absolute inset-0 h-full bg-red-100'>
                <Image
                    src={backImage[heroIndex]}
                    width={1000}
                    height={1000}
                    alt='Hero Image'
                    className='h-full w-full object-cover object-center rounded-lg'
                    unoptimized
                />
            </div>
            <div className='relative  w-[90%] top-[40%] lg:top-[50%] left-[5%] z-[10] lg:w-[50%]'>
                <h1 className='text-[18px] sm:text-[20px] lg:text-3xl text-[#FFFF] font-semibold font-dm_sans mb-1 md:mb-3 leading-[25px]'>{heroSlides[heroIndex].title}</h1>
                <h2 className="text-[14px] lg:text-base text-[#f1f1f1] font-medium font-inter">{heroSlides[heroIndex].description}</h2>
                <div className='text-[#f1f1f1] my-2 hidden sm:block'>
                    🚀 Fast Delivery | 🍔 Great Taste | 📱 Easy to Order
                </div>
                <button className='py-2 px-8 bg-blue-700 hover:bg-blue-600 text-white mt-2 rounded-md'>Expore Food</button>
            </div>
            {/* overlay */}
            <div className='absolute inset-0 bg-black/15'>

            </div>
        </div>
    )
}

export default Hero