'use client'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import useSearchFood from '../services/users/useSearchFood'
import useUserSignUp from '../services/users/useUserSignUp'
import useUserSignIn from '../services/users/useUserSignIn'
import { useRouter } from 'next/navigation'
import * as Dialog from "@radix-ui/react-dialog"
import { AuthForm } from '../ContextAPI/AuthFormContext'
import { useForm } from 'react-hook-form'
import { errorToast, successToast } from './ReactToast'
import { userValidate } from '../ContextAPI/IsUserAuthContext'
const Header = () => {
    const path = usePathname()
    const router = useRouter()
    const [search, setSearch] = useState(null)
    const { showSignUp, setShowSignUp, showLogIn, setShowLogIn } = useContext(AuthForm)
    const { setCallUserValidate } = useContext(userValidate)


    const { register: registerSignUp, handleSubmit: handleSignUp, formState: { errors: errorsSingUp }, reset: resetSignUp
    } = useForm()

    const { register: registerSignIn, handleSubmit: handleSignIn, formState: { errors: errorsSingIn }, reset: resetSignIn
    } = useForm()

    const { searchFood, errorSearchFood, getSearchFood } = useSearchFood()
    const { successSignUp, errorSignUp, getSignUp } = useUserSignUp()

    const { successSignIn, errorSignIn, getSignIn } = useUserSignIn()

    useEffect(() => {

        if (search) {
            const timer = setTimeout(() => {
                getSearchFood(search)

            }, 500)
            return () => clearTimeout(timer)
        }
    }, [search])

    const userSignUp = (data) => {
        getSignUp(data)
    }

    useEffect(() => {
        if (successSignUp) {
            successToast(successSignUp)
            resetSignUp()
        }
        if (errorSignUp) {
            errorToast(errorSignUp)
        }
    }, [successSignUp, errorSignUp])


    const userSignIn = (data) => {
        getSignIn(data)
    }

    useEffect(() => {
        if (successSignIn) {
            successToast(successSignIn)
            resetSignIn()
            setCallUserValidate((prev) => !prev)
        }
        if (errorSignIn) {
            errorToast(errorSignIn)
        }
    }, [successSignIn, errorSignIn])

    return (
        <div className=' container pt-3 pb-1 border-b-2 border-b-gray-200 flex justify-between items-center'>

            <Link href="/" className='flex gap-1 items-center'>
                <Image
                    src='/admin/food_logo.jpg'
                    width={300}
                    height={300}
                    alt='food logo'
                    className='h-[50px] w-[50px]'

                />
                <h1 className='text-[20px] lg:text-2xl font-bold font-dm_sans'>Chito Khaja</h1>
            </Link>
            {/* menu */}
            <section className='block pr-6 cursor-pointer md:hidden'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#797070" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" /></svg>
            </section>

            <section className='hidden md:flex gap-[30px] lg:gap-[60px] items-center'>

                <Link href="/" className={`text-[16px] font-medium font-dm_sans hover:text-blue-700 cursor-pointer ${path === "/" ? "text-blue-700" : ""}`}>Home</Link>
                <Link href='/category' className={`text-[16px] font-medium font-dm_sans hover:text-blue-700 cursor-pointer ${path === "/category" ? "text-blue-700" : ""}`}>Category</Link>
                <Link href='/popular' className={`text-[16px] font-medium font-dm_sans hover:text-blue-700 cursor-pointer ${path === "/popular" ? "text-blue-700" : ""}`}>Popular</Link>
                <Link href='/popular-food' className={`text-[16px] font-medium font-dm_sans hover:text-blue-700 cursor-pointer ${path === "/popular-food" ? "text-blue-700" : ""}`}>Recent</Link>


            </section>
            <section className='hidden md:flex gap-[30px] lg:gap-[40px] items-center'>
                <div className='relative'>
                    <div className=' flex border border-[#EEEEEE] rounded-lg py-[6px] px-3 items-center gap-1 max-w-[190px]'>
                        <Search size={20} />
                        <input type="text" className='pl-1 outline-none border-none w-full text-[14px]' placeholder='Search food' onChange={(e) => setSearch(e.target.value)} />

                    </div>
                    {searchFood && searchFood.length > 0 &&
                        <div className='absolute z-[20] py-3 rounded-md flex gap-1 flex-col top-full w-full bg-white shadow-md min-h-[100px] max-h-[250px] overflow-y-auto custom-scroll'>
                            {searchFood.map((food, index) => (
                                <div key={index} className='flex gap-2 px-4 hover:bg-gray-100 py-1' >
                                    <h1 onClick={() => router.push(`/cart?foodId:${food._id}`)}>{food.name}</h1>
                                </div>
                            ))}

                        </div>
                    }
                </div><Link href="/order" className={`cursor-pointer ${path === "/cart" ? "text-blue-700" : "text-gray-800"} `}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#797070" d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z" /></svg></Link>
                <h1 className={`text-[16px] font-medium font-dm_sans hover:text-blue-700 cursor-pointer ${path === "/" ? "text-blue-700" : ""}`} onClick={() => setShowSignUp(!showSignUp)}>Signup</h1>
                {
                    showSignUp && <Dialog.Root onOpenChange={setShowSignUp} open={showSignUp}>
                        <Dialog.Trigger asChild>
                            <button className="inline-flex h-[35px] items-center justify-center rounded bg-violet4 px-[15px] font-medium leading-none text-violet11 outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none">
                                {/* Edit profile */}
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/20 data-[state=open]:animate-overlayShow" />
                            <Dialog.Content className="fixed bg-[#FFFF] left-1/2 top-1/2 max-h-[85vh] z-[20] shadow-md w-[90vw] max-w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1   focus:outline-none data-[state=open]:animate-contentShow">
                                <Dialog.Title >
                                </Dialog.Title>


                                <form className="flex flex-col space-y-4 p-4" onSubmit={handleSignUp(userSignUp)}>
                                    <h2 className="text-xl font-semibold text-center mb-4">Sign Up</h2>
                                    <div className='relative'>
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm outline-none"
                                            {...registerSignUp("userName", { required: "User Name is required field" })}


                                        />
                                        {errorsSingUp.userName && <p className='absolute top-full text-[10px] text-red-500'>{errorsSingUp.userName.message}</p>}
                                    </div>


                                    <div className='relative'>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm outline-none"
                                            {...registerSignUp("email", {
                                                required: "User email is required", pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: "Valid email is required"
                                                }
                                            })}
                                        />
                                        {errorsSingUp.email && <p className='absolute top-full text-[10px] text-red-500'>{errorsSingUp.email.message}</p>}
                                    </div>

                                    <div className='relative'>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm outline-none"
                                            {...registerSignUp("password", {
                                                required: "password is required", minLength: {
                                                    value: 8,
                                                    message: "Minimum 8 characters password is required"
                                                }
                                            })}
                                        />
                                        {errorsSingUp.password && <p className='absolute top-full text-[10px] text-red-500'>{errorsSingUp.password.message}</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white py-2 mt-10 rounded-lg hover:bg-blue-500 text-sm"
                                    >
                                        Sign Up
                                    </button>
                                    <p className="text-center text-sm text-gray-500 mt-2">
                                        Already have an account?{' '}
                                        <span
                                            className="text-blue-600 cursor-pointer hover:underline"
                                            onClick={() => { setShowLogIn(!showLogIn), setShowSignUp(false) }}
                                        >
                                            Sign  in
                                        </span>
                                    </p>
                                </form>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                }


                {
                    showLogIn && <Dialog.Root onOpenChange={setShowLogIn} open={showLogIn}>
                        <Dialog.Trigger asChild>
                            <button className="inline-flex h-[35px] items-center justify-center rounded bg-violet4 px-[15px] font-medium leading-none text-violet11 outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none">
                                {/* Edit profile */}
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/20 data-[state=open]:animate-overlayShow" />
                            <Dialog.Content className="fixed bg-[#FFFF] left-1/2 top-1/2 max-h-[85vh] z-[20] shadow-md w-[90vw] max-w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1   focus:outline-none data-[state=open]:animate-contentShow">
                                <Dialog.Title >
                                </Dialog.Title>


                                <form className="flex flex-col space-y-4 p-4" onSubmit={handleSignIn(userSignIn)}>
                                    <h2 className="text-xl font-semibold text-center mb-4">Sign In</h2>
                                    <div className='relative'>
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm outline-none"
                                            {...registerSignIn("email", {
                                                required: "User email is required", pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: "Invalid Email"
                                                }
                                            })}

                                        />
                                        {errorsSingIn.email && <p className='absolute top-full text-[10px] text-red-500'>{errorsSingIn.email.message}</p>}
                                    </div>
                                    <div className='relative'>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm outline-none"
                                            {...registerSignIn("password", {
                                                required: "Password is required", minLength: {
                                                    value: 8,
                                                    message: "Strong password with more that 8 characters is requried"
                                                }
                                            })}
                                        />
                                        {errorsSingIn.password && <p className='absolute top-full text-[10px] text-red-500'>{errorsSingIn.password.message}</p>}
                                    </div>


                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white py-2 mt-10 rounded-lg hover:bg-blue-500 text-sm"

                                    >
                                        Log In
                                    </button>
                                    <p className="text-center text-sm text-gray-500 mt-2">
                                        Don't have an account?{' '}
                                        <span
                                            className="text-blue-600 cursor-pointer hover:underline"
                                            onClick={() => { setShowSignUp(!showSignUp), setShowLogIn(false) }}
                                        >
                                            Sign Up
                                        </span>
                                    </p>
                                </form>



                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                }

            </section>

        </div>
    )
}

export default Header