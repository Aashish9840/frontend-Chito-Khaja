'use client'
import React, { useEffect, useState } from 'react'
import SidePanel from "../../../reuseComponents/SidePanel";
import AdminInfo from "../../../reuseComponents/AdminInfo";
import { ChevronDown, Upload, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import useAddFood from '../../../services/admin/useAddFood';
import { successToast, errorToast } from '../../../reuseComponents/ReactToast'
const page = () => {
    const [foodImage, setFoodImage] = useState(null)

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm()

    const { successFood, errorFood, getAddFood } = useAddFood()
    const handleInputImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFoodImage(file)
            setValue("image", file, { shouldValidate: true })
        }
    }

    useEffect(() => {
        register("image", { required: "Image is required" });
    }, [register]);


    const addFood = (data) => {
        getAddFood(data)
    }

    useEffect(() => {
        if (successFood) {
            successToast(successFood)
            reset()
            setFoodImage(null)
        }

        if (errorFood) {
            errorToast(errorFood)
        }
    }, [successFood, errorFood])


    return (
        <div className="flex h-screen">
            <SidePanel />
            <section className="w-full md:w-[85%] h-screen overflow-y-auto">
                <AdminInfo />
                <div className="w-full px-4 mt-2 pb-8 oveflow-y-auto md:px-10 md:w-[500px] lg:w-[600px]">
                    <header className='flex flex-col border-b border-b-gray-300 mb-2 gap-1'>
                        <h1 className="text-[18px] sm:text-xl font-semibold text-gray-800">Add New Food Item</h1>
                        <h2 className='text-[14px] sm:text-[16px] text-gray-600'>Add food that customers might prefer with the proper food details</h2>

                    </header>

                    <form className="flex flex-col mt-7 gap-5 " onSubmit={handleSubmit(addFood)}>
                        <div className='flex gap-3 items-center justify-between w-full'>
                            {/* Food Name */}
                            <div className='w-full relative'>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter food name"
                                        className="w-full border outline-none border-gray-300 rounded-lg px-4 py-2 "
                                        {...register("name", { required: "Food Name is required field" })}
                                    />
                                </div>

                                {errors.name && <p className='absolute top-full text-[12px] text-red-500'>{errors.name.message}</p>}
                            </div>


                            {/* Price */}
                            <div className='w-full relative'>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                    <input
                                        type="text"
                                        placeholder="Enter price"
                                        className="w-full border outline-none border-gray-300 rounded-lg px-4 py-2 "
                                        {...register("prize", { required: "Price is requried" })}
                                    />
                                </div>


                                {errors.prize && <p className='absolute top-full text-[12px] text-red-500'>{errors.prize.message}</p>}
                            </div>
                        </div>

                        {/* Description */}
                        <div className='relative'>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows="3"
                                    placeholder="Write a short description"
                                    className="w-full outline-none border border-gray-300 resize-none rounded-lg px-4 py-2 "
                                    {...register("description", { required: "Description is required" })}
                                ></textarea>
                            </div>

                            {errors.description && <p className='absolute top-full text-[12px] text-red-500'>{errors.description.message}</p>}
                        </div>

                        {/* Category */}
                        <div className='relative'>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <div className=' relative w-full rounded-lg border border-gray-300  '>

                                <input
                                    type="text"
                                    placeholder='food category'
                                    className="w-full outline-none border border-gray-300 resize-none rounded-lg px-4 py-2 "
                                    {...register("category", {
                                        required: "Category is required"
                                    })}
                                />
                                {errors.category && <p className='absolute top-full text-[12px] text-red-500'>{errors.category.message}</p>}

                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className='relative'>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                                <div className='relative w-full border border-gray-300 flex justify-center items-center rounded-lg h-fit min-h-[150px] px-4 '>

                                    <input
                                        type="file"

                                        accept="image/*"
                                        id="InputImage"
                                        className="w-full text-sm text-gray-500 hidden"
                                        onChange={(e) => {
                                            handleInputImage(e);
                                        }}
                                    />
                                    {
                                        foodImage ?
                                            <div>

                                                <Image

                                                    src={URL.createObjectURL(foodImage)}
                                                    height={200}
                                                    width={200}
                                                    alt='food Image'
                                                    className='h-[150px] w-[150px] py-5 rounded-sm'
                                                />
                                                <X className='absolute top-2 right-[180px] cursor-pointer  text-gray-800' size={20} onClick={() => { setFoodImage(null), setValue("image", null, { shouldValidate: true }) }} />
                                            </div>
                                            :
                                            <div className='flex flex-col gap-2 cursor-pointer items-center' onClick={() => document.getElementById("InputImage").click()}>

                                                <Upload size={20} />
                                                <h1 className='text-gray-900 font-medium' >Upload Image</h1>

                                            </div>
                                    }
                                </div>
                            </div>
                            {errors.image && <p className='absolute top-full text-[12px] text-red-500'>{errors.image.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-gray-700 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 transition-all"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section >
        </div >
    )
}

export default page