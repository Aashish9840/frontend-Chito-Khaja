import Image from 'next/image'
import React from 'react'

const Hero = () => {
    const backImage = ["/Hero/food_banner_1.jpg", "/Hero/food_banner_2.jpg", "/Hero/food_banner_3.jpg", "/Hero/food_banner_4.jpg", "/Hero/food_banner_5.jpg"]
    return (
        <div className='container my-4 h-[85vh] relative'>
            <div className='absolute inset-0 h-full'>
                <Image
                    src="/Hero/food_banner_1.jpg"
                    width={1000}
                    height={1000}
                    alt='Hero Image'
                    className='h-full w-full object-cover object-center rounded-lg'
                />
            </div>
        </div>
    )
}

export default Hero