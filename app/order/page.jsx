'use client'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../reuseComponents/Header'
import { userValidate } from '../ContextAPI/IsUserAuthContext'
import Image from 'next/image'
import { Mail, X } from 'lucide-react'
import useUpdatedCart from '../services/users/useUpdatedCart'
import { useForm } from 'react-hook-form'
import usePlaceOrder from '../services/users/usePlaceOrder'
import { errorToast, successToast } from '../reuseComponents/ReactToast'
import Footer from '../components/Footer'

const page = () => {
    const imagePath = process.env.NEXT_PUBLIC_IMAGE
    const [product, setProduct] = useState([])
    const [updatedCart, setUpdatedCart] = useState(null)
    const [subTotal, setSubTotal] = useState(0)
    const [showOrder, setShowOrder] = useState({
        confirmOrder: true,
        CheckOut: false,
        UpdateCart: false,
    })
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    const { validateUser, setCallUserValidate } = useContext(userValidate)
    const { successUpdate, errorUpdate, mutatedCart } = useUpdatedCart()

    const { successCart, errorCart, placeOrder } = usePlaceOrder()
    useEffect(() => {
        if (validateUser?.cardData) {
            const arry = []
            validateUser?.cardData?.forEach(element => {
                arry.push(element)
            });
            setProduct(arry)
        }
    }, [validateUser?.cardData])

    const handleRemove = (id) => {
        setProduct((prevProducts) => {
            const updated = prevProducts
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0);

            setUpdatedCart(updated);
            return updated;
        });
    };
    // api hit for cartData update after 5 secs based on users remove action
    useEffect(() => {
        if (updatedCart !== null) {
            const time = setTimeout(() => {

                mutatedCart(updatedCart)

            }, 3000)
            return () => clearTimeout(time)
        }
        if (showOrder.UpdateCart) {
            const cart = []
            mutatedCart(cart)
        }

    }, [updatedCart, showOrder.UpdateCart]);
    // recalling the validateuser for user update
    useEffect(() => {
        if (successUpdate) {
            setCallUserValidate(prev => !prev)
            setUpdatedCart(null)
            setShowOrder(prev => ({ ...prev, UpdateCart: false }))
        }
    }, [successUpdate])
    // subtotal calculation
    useEffect(() => {
        if (product) {
            let cal = 0
            product.forEach(item => {
                cal += Number(item.prize) * item.quantity

            })
            setSubTotal(cal)
        }

    }, [product])
    // placeOrder
    const orderForm = (data) => {
        const newData = { ...data, foodItems: product }
        placeOrder(newData)
    }
    // success and error place order
    useEffect(() => {
        if (successCart) {
            successToast(successCart)
            setShowOrder(prev => ({ ...prev, UpdateCart: true }))
            reset()
        }
        if (errorCart) {
            errorToast(errorCart)
        }
    }, [successCart, errorCart])


    return (
        <div className='container px-4 sm:px-0'>
            <Header />
            <section className='my-4'>
                {/* <div className='grid grid-cols-2 w-full h-fit'>
                    <h1 className={`${showOrder.confirmOrder ? "border-b-2 border-b-blue-700 bg-gray-100" : ""} text-center py-2 font-dm_sans font-medium`}
                        onClick={() => setShowOrder(prev => ({ ...prev, confirmOrder: true, CheckOut: false }))}
                    >Confirm Order</h1>
                    <h1 className={`${showOrder.CheckOut ? "border-b-2 border-b-blue-700 bg-gray-100" : ""} text-center py-2 font-dm_sans font-medium`}
                        onClick={() => setShowOrder(prev => ({ ...prev, confirmOrder: false, CheckOut: true }))}
                    >CheckOut</h1>


                </div> */}

                {showOrder.confirmOrder && <main className='py-4'>
                    <div className='w-full h-[40vh] overflow-y-auto custom-scroll'>
                        <table className='w-full' >
                            <thead className='w-full border-b-2 border-b-gray-100'>
                                <tr>
                                    <td className='text-base font-dm_sans font-medium text-gray-500 pb-3 px-4 '>Image</td>
                                    <td className='text-base font-dm_sans font-medium text-gray-500 pb-3 px-4 '>Food</td>
                                    <td className='text-base font-dm_sans font-medium text-gray-500 pb-3 px-4'>Price</td>

                                    <td className='text-base font-dm_sans font-medium text-gray-500 pb-3 px-4'>Quantity</td>

                                    <td className='text-base font-dm_sans font-medium text-gray-500 pb-3 px-4'>Total Price</td>

                                    <td className='text-base font-dm_sans font-medium text-gray-500 pb-3 px-4'>
                                        Remove
                                    </td>
                                </tr>

                            </thead>

                            <tbody >
                                {
                                    product?.map((items, index) => (

                                        <tr key={index} className='mt-4 w-full'>
                                            <td className='text-base font-dm_sans py-1 border-b-2 border-b-gray-100   px-4 '>
                                                <Image
                                                    src={`${imagePath}/${items?.image}`}
                                                    height={200}
                                                    width={200}
                                                    alt='food Image'
                                                    className='h-[55px] w-[55px] rounded-md'
                                                />
                                            </td>



                                            <td className='text-base font-dm_sans py-1 border-b-2 border-b-gray-100   px-4 '>{items.name}</td>
                                            <td className='text-base font-dm_sans py-1 border-b-2 border-b-gray-100   px-4'>Rs. {items.prize}</td>

                                            <td className='text-base font-dm_sans  py-1 border-b-2 border-b-gray-100   px-4'>{items.quantity} Qtn</td>

                                            <td className='text-base font-dm_sans py-1 border-b-2 border-b-gray-100   px-4'>Rs. {items.quantity * items.prize}</td>
                                            <td className='text-base font-dm_sans py-1 border-b-2 border-b-gray-100   px-4' onClick={() => handleRemove(items.id)}>
                                                <X size={18} className='cursor-pointer' />
                                            </td>



                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="w-full md:w-80 py-8 font-serif">
                        <h2 className="text-xl font-semibold mb-2">Cart Total</h2>

                        <div className="flex justify-between py-2 border-b border-gray-300">
                            <span>Subtotal</span>
                            <span>Rs. {subTotal}</span>
                        </div>

                        <div className="flex justify-between py-2 border-b border-gray-300">
                            <span> Delivery Charge</span>
                            <span>Rs. 100</span>
                        </div>

                        <div className="flex justify-between py-2 border-b-2 border-black font-bold text-lg mt-2">
                            <span>Total</span>
                            <span>Rs. {subTotal + 100}</span>
                        </div>

                        <button onClick={() => {
                            if (product.length > 0) {
                                setShowOrder(prev => ({ ...prev, confirmOrder: false, CheckOut: true }))
                            }
                            else (
                                errorToast("Add atleast one product to cart bedore checkout")
                            )
                        }
                        } className="mt-6 px-4 py-2 bg-blue-700 text-white font-semibold rounded hover:bg-blue-600 transition">
                            Check Out
                        </button>
                    </div>


                </main>
                }
                {
                    showOrder.CheckOut && <section className='flex flex-col items-start gap-8 md:gap-20 sm:flex-row w-full py-8'>
                        <form onSubmit={handleSubmit(orderForm)} className="w-full sm:w-[60vw] lg:w-[40vw] space-y-5 font-sans">
                            <div className="flex space-x-4">
                                <div className=" relative w-1/2">
                                    <label className="block text-sm font-medium mb-1">First name</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="First name"
                                        {...register('firstName', { required: "first Name is required" })}
                                    />
                                    {errors.firstName && <p className='absolute top-full text-[12px] font-medium font-dm_sans text-red-500'>{errors.firstName.message}</p>}
                                </div>
                                <div className="relative w-1/2">
                                    <label className="block text-sm font-medium mb-1">Last name</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="Last name"
                                        {...register("lastName", { required: "Last Name is required" })}
                                    />
                                    {errors.lastName && <p className='absolute top-full text-[12px] font-medium font-dm_sans text-red-500'>{errors.lastName.message}</p>}
                                </div>
                            </div>
                            <section className="flex space-x-4">
                                <div className='relative w-1/2'>
                                    <label className="block text-sm font-medium mb-1">Email address</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><Mail size={18} /></span>
                                        <input
                                            type="email"
                                            className="w-full border rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="you@example.com"
                                            {...register("email", {
                                                required: "email is required", pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Invalid Email"
                                                }
                                            })}
                                        />

                                    </div>
                                    {errors.email && <p className='absolute top-full text-[12px] font-medium font-dm_sans text-red-500'>{errors.email.message}</p>}

                                </div>
                                <div className='relative w-1/2'>
                                    <label className="block text-sm font-medium mb-1">Street address</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="Street address"
                                        {...register("streetAddress")}
                                    />
                                    {errors.streetAddress && <p className='absolute top-full text-[12px] font-medium font-dm_sans text-red-500'>{errors.streetAddress.message}</p>}

                                </div>
                            </section>

                            <section className="flex space-x-4 w-full">
                                <div className='relative w-1/2'>
                                    <label className="block text-sm font-medium mb-1">City</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="City"
                                        {...register("city", { required: "City is required" })}
                                    />
                                    {errors.city && <p className='absolute top-full text-[12px] font-medium font-dm_sans text-red-500'>{errors.city.message}</p>}

                                </div>
                                <div className='relative w-1/2'>
                                    <label className="block text-sm font-medium mb-1">Contact Number</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="Contact Info"
                                        {...register("contact", { required: "City is required" })}
                                    />
                                    {errors.contact && <p className='absolute top-full text-[12px] font-medium font-dm_sans text-red-500'>{errors.contact.message}</p>}
                                </div>
                            </section>
                            <div className='relative'>
                                <label className="block text-sm font-medium mb-1">Country</label>
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Country"
                                    {...register("country", { required: "Country is required" })}
                                />
                                {errors.country && <p className='absolute top-full text-[12px] font-medium font-dm_sans text-red-500'>{errors.country.message}</p>}

                            </div>

                            <button type="submit" className="w-full py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition">
                                Order
                            </button>
                        </form>
                        <div className='border border-gray-300 shadow-md z-10 p-4 w-full md:w-[400px]'>
                            <h1 className='text-base font-dm_sans font-medium text-center'>Payment Details</h1>
                            <section className='py-4 flex flex-col gap-2'>
                                <div className=' grid grid-cols-2 gap-20 lg:gap-40'>

                                    <h1 className='text-[14px] font-dm_sans font-medium'>Payement Type</h1>
                                    <h1 className='text-[14px] font-dm_sans font-medium'>e-sewa</h1>

                                </div>
                                <div className='grid grid-cols-2 gap-20 lg:gap-40'>

                                    <h1 className='text-[14px] font-dm_sans font-medium'>Total Items</h1>
                                    <h1 className='text-[14px] font-dm_sans font-medium'>{product.length}</h1>

                                </div>
                                <div className='grid grid-cols-2 gap-20 lg:gap-40 border-t-2 border-t-gray-200 pt-2'>

                                    <h1 className='text-[14px] font-dm_sans font-medium'>Total Price</h1>
                                    <h1 className='text-[14px] font-dm_sans font-medium'>Rs. {subTotal}</h1>

                                </div>

                            </section>

                        </div>
                    </section>
                }
            </section>
            <Footer />
        </div>
    )
}

export default page