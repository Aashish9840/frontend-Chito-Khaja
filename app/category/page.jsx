'use client'
import React, { useEffect, useRef } from 'react'
import Header from '../reuseComponents/Header'
import Footer from '../components/Footer'
import getCategoryFood from '../services/users/getCategoryFood'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FoodCart from '../components/FoodCart'
import Slider from 'react-slick'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const page = () => {
    const { categoryFood, errorCategory, useFoodCategory } = getCategoryFood()
    useEffect(() => {
        useFoodCategory()
    }, [])

    let sliderRef = useRef([]);
    const next = (index) => {
        sliderRef.current[index]?.slickNext();
    };
    const previous = (index) => {
        sliderRef.current[index]?.slickPrev();
    };
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    infinite: true,
                }
            },
            {
                breakpoint: 624,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,

                }
            },

        ]
    };

    const foodCategory = [
        {
            title: "Noodles Dishes",
            Items: categoryFood?.noodles
        },
        {
            title: "Momo Dishes",
            Items: categoryFood?.momo
        },
        {
            title: "Burger Dishes",
            Items: categoryFood?.burger
        },
        {
            title: "Pizza Dishes",
            Items: categoryFood?.pizza
        },
    ]

    return (
        <div className='container'>
            <Header />
            <main className='py-4 flex flex-col gap-10'>
                {foodCategory?.map((food, index) => (
                    <section className='relative w-full h-fit flex flex-col gap-2' key={index}>
                        <h1 className='text-xl font-semibold font-commissioner'>
                            {food?.title} ({food?.Items?.length})
                        </h1>
                        <div className=' slider-container py-4 px-6'>

                            <Slider {...settings} ref={slider => {
                                sliderRef.current[index] = slider
                            }}>
                                {food?.Items?.map((food, index) => (
                                    <div key={index} className="px-1">
                                        <FoodCart food={food} />
                                    </div>

                                ))}

                            </Slider>

                        </div>
                        {/* prev slide button */}
                        <button className="absolute top-[45%] left-0 shadow-lg rounded-full z-10 flex items-center justify-center p-[2px] border-2 border-gray-200 bg-white" onClick={() => previous(index)}>
                            <ChevronLeft size={20} className='text-black' />
                        </button>
                        {/* next slide */}
                        <button className="absolute top-[45%] right-0 shadow-lg rounded-full z-10 flex items-center justify-center p-[2px] border-2 border-gray-200 bg-white" onClick={() => next(index)}>
                            <ChevronRight size={20} className='text-black' />
                        </button>

                    </section>

                ))}

            </main>
            <Footer />
            <style>
                {`
                    .slick-arrow.slick-prev {
                        display: none !important;
                    }
                        .slick-arrow.slick-next {
                        display: none !important;
                    }
                `}
            </style>
        </div>
    )
}

export default page