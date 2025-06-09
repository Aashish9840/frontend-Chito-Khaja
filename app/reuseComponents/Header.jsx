'use client'
import { LogOut, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'
import useSearchFood from '../services/users/useSearchFood'
import useUserSignUp from '../services/users/useUserSignUp'
import useUserSignIn from '../services/users/useUserSignIn'
import useGetLogOut from '../services/users/useGetLogOut'
import { useRouter } from 'next/navigation'
import * as Dialog from "@radix-ui/react-dialog"
import { AuthForm } from '../ContextAPI/AuthFormContext'
import { useForm } from 'react-hook-form'
import { errorToast, successToast } from './ReactToast'
import { userValidate } from '../ContextAPI/IsUserAuthContext'
import { userContext } from '../ContextAPI/IsAuthContext'
const Header = () => {
    const path = usePathname()
    const router = useRouter()
    const closeUserPopUP = useRef()
    const [search, setSearch] = useState(null)
    const [showForm, setShowForm] = useState({
        loginInfo: false,
        mobileMenu: false,
        useLoginInfo: false,
    })
    const viewMobileLink = [
        {
            title: "Home",
            link: '/'
        },
        {
            title: "Category",
            link: "/category",
        },
        {
            title: "Popular",
            link: "/popular"
        },
        {
            title: "Order History",
            link: "/order-history"
        },
        {
            title: "Order",
            link: "/order"
        }
    ]
    const { showSignUp, setShowSignUp, showLogIn, setShowLogIn } = useContext(AuthForm)
    const { validateUser, setCallUserValidate } = useContext(userValidate)

    const { register: registerSignUp, handleSubmit: handleSignUp, formState: { errors: errorsSingUp }, reset: resetSignUp
    } = useForm()

    const { register: registerSignIn, handleSubmit: handleSignIn, formState: { errors: errorsSingIn }, reset: resetSignIn
    } = useForm()

    const { searchFood, errorSearchFood, getSearchFood } = useSearchFood()
    const { successSignUp, errorSignUp, getSignUp } = useUserSignUp()
    const { successLogOut, errorLogOut, signOut } = useGetLogOut()
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
            setShowLogIn(true)
            setShowSignUp(false)
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
            setShowLogIn(false)


        }
        if (errorSignIn) {
            errorToast(errorSignIn)
        }
    }, [successSignIn, errorSignIn])

    useEffect(() => {
        if (successLogOut) {
            successToast(successLogOut)
            setCallUserValidate((prev) => !prev)
        }
        if (errorLogOut) {
            errorToast(errorLogOut)
        }
    }, [successLogOut, errorLogOut])

    // close the user details popup by outside clicking

    useEffect(() => {
        const removeUserDetails = (e) => {
            if (!closeUserPopUP?.current?.contains(e.target)) {
                setShowForm(prev => ({ ...prev, loginInfo: false, mobileMenu: false, useLoginInfo: false }))
            }
        }
        document.addEventListener("mousedown", removeUserDetails)

    }, [])

    return (
        <div className=' container pt-3 pb-1 border-b-2 border-b-gray-200 flex justify-between items-center'>

            <Link href="/" className='flex gap-1 items-center'>
                <Image
                    src='/admin/food_logo.jpg'
                    width={300}
                    height={300}
                    alt='food logo'
                    className='h-[50px] w-[50px]'
                    priority

                />
                <h1 className='text-[20px] lg:text-2xl font-bold font-dm_sans'>Chito Khaja</h1>
            </Link>


            <section className='hidden md:flex gap-[30px] lg:gap-[60px] items-center'>

                <Link href="/" className={`text-[16px] font-medium font-dm_sans hover:text-blue-700 cursor-pointer ${path === "/" ? "text-blue-700" : ""}`}>Home</Link>
                <Link href='/category' className={`text-[16px] font-medium font-dm_sans hover:text-blue-700 cursor-pointer ${path === "/category" ? "text-blue-700" : ""}`}>Category</Link>
                <Link href='/popular' className={`text-[16px] font-medium font-dm_sans hover:text-blue-700 cursor-pointer ${path === "/popular" ? "text-blue-700" : ""}`}>Popular</Link>
                <Link href='/order-history' className={`text-[16px] font-medium font-dm_sans hover:text-blue-700 cursor-pointer ${path === "/popular-food" ? "text-blue-700" : ""}`}>Order History</Link>
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
                </div>
                <div onClick={() => router.push('/order')} className={` relative cursor-pointer ${path === "/order" ? "text-blue-700" : "text-gray-800"} `}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#797070" d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z" /></svg>
                    {validateUser && validateUser?.cardData?.length >= 0 &&

                        <div className='absolute bg-red-400 p-1 top-[-10px] rounded-[50%] w-[20px] h-[20px] flex items-center justify-center left-4'>


                            <h1 className=' font-extrabold font-dm_sans text-sm text-white'>{validateUser.cardData.length}</h1>
                        </div>
                    }
                </div>
                <div className='relative'>
                    {
                        validateUser ?
                            <div className='relative' onClick={() => setShowForm(prev => ({ ...prev, loginInfo: !prev.loginInfo }))}>
                                <div className=' flex justify-center items-center w-[40px] h-[40px] rounded-full p-2 border cursor-pointer bg-bulk-white font-semibold'>
                                    {validateUser?.userName.substring(0, 2).toUpperCase()}
                                </div>
                                {showForm?.loginInfo && <div ref={closeUserPopUP} className='absolute flex flex-col gap-3 top-full right-2 min-w-[150px] w-fit max-h-[250px] overflow-y-auto custom-scroll py-2 shadow-lg rounded-sm z-[1000] bg-white'>

                                    <div className='mx-4 border-b-2 pb-1 border-b-gray-700'>
                                        <h1 className='text-base font-dm_sans font-bold '>{validateUser?.userName}</h1>
                                        <h1 className='text-[12px] font-dm_sans font-medium  text-gray-700'>{validateUser?.email}</h1>
                                    </div>
                                    <section className='flex flex-col mt-2 px-4'>
                                        <div onClick={(e) => { e.stopPropagation(), router.push('/order') }} className='flex gap-3 items-center py-[6px] px-1 cursor-pointer rounded-md hover:bg-bulk-white'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#7b6868" fillRule="evenodd" d="M10 2.25a1.75 1.75 0 0 0-1.582 1c-.684.006-1.216.037-1.692.223A3.25 3.25 0 0 0 5.3 4.563c-.367.493-.54 1.127-.776 1.998l-.047.17l-.513 2.964q-.277.191-.486.459c-.901 1.153-.472 2.87.386 6.301c.545 2.183.818 3.274 1.632 3.91C6.31 21 7.435 21 9.685 21h4.63c2.25 0 3.375 0 4.189-.635c.814-.636 1.086-1.727 1.632-3.91c.858-3.432 1.287-5.147.386-6.301a2.2 2.2 0 0 0-.487-.46l-.513-2.962l-.046-.17c-.237-.872-.41-1.506-.776-2a3.25 3.25 0 0 0-1.426-1.089c-.476-.186-1.009-.217-1.692-.222A1.75 1.75 0 0 0 14 2.25zm8.418 6.896l-.362-2.088c-.283-1.04-.386-1.367-.56-1.601a1.75 1.75 0 0 0-.768-.587c-.22-.086-.486-.111-1.148-.118A1.75 1.75 0 0 1 14 5.75h-4a1.75 1.75 0 0 1-1.58-.998c-.663.007-.928.032-1.148.118a1.75 1.75 0 0 0-.768.587c-.174.234-.277.56-.56 1.6l-.362 2.089C6.58 9 7.91 9 9.685 9h4.63c1.775 0 3.105 0 4.103.146M8 12.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75m8.75.75a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zM12 12.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75" clipRule="evenodd" /></svg>
                                            <h1 className='text-sm font-dm_sans font-medium'>Order</h1>
                                        </div>
                                        <div className='flex gap-3 items-center py-[6px] px-1 cursor-pointer rounded-md hover:bg-bulk-white' onClick={(e) => (e.stopPropagation(), signOut())}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#7b6868" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z" /></svg>
                                            <h1 className='text-sm font-dm_sans font-medium'>Sign Out</h1>
                                        </div>

                                    </section>

                                </div>
                                }
                            </div>
                            :
                            <h1 className={`text-[16px] font-medium font-dm_sans hover:text-blue-700 cursor-pointer ${path === "/" ? "text-blue-700" : ""}`} onClick={() => setShowLogIn(!showLogIn)}>LogIn</h1>
                    }
                </div>
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

            {/* for mobile view */}
            <main className='block md:hidden'>


                <div className='flex items-center gap-6 '>
                    {/* signup button for mobile */}
                    <div className=''>
                        {
                            validateUser ?
                                <div className='relative' onClick={() => setShowForm(prev => ({ ...prev, useLoginInfo: !prev.useLoginInfo }))}>
                                    <div className=' flex justify-center items-center w-[40px] h-[40px] rounded-full p-2 border cursor-pointer bg-bulk-white font-semibold'>
                                        {validateUser?.userName.substring(0, 2).toUpperCase()}
                                    </div>
                                    {showForm.useLoginInfo && <div ref={closeUserPopUP} className='absolute flex flex-col gap-3 top-full right-2 min-w-[150px] w-fit max-h-[250px] overflow-y-auto custom-scroll py-2 shadow-lg rounded-sm z-10 bg-white'>

                                        <div className='mx-4 border-b-2 pb-1 border-b-gray-700'>
                                            <h1 className='text-base font-dm_sans font-bold '>{validateUser?.userName}</h1>
                                            <h1 className='text-[12px] font-dm_sans font-medium  text-gray-700'>{validateUser?.email}</h1>
                                        </div>
                                        <section className='flex flex-col mt-2 px-4'>
                                            <div onClick={(e) => { e.stopPropagation(), router.push('/order') }} className='flex gap-3 items-center py-[6px] px-1 cursor-pointer rounded-md hover:bg-bulk-white'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#7b6868" fillRule="evenodd" d="M10 2.25a1.75 1.75 0 0 0-1.582 1c-.684.006-1.216.037-1.692.223A3.25 3.25 0 0 0 5.3 4.563c-.367.493-.54 1.127-.776 1.998l-.047.17l-.513 2.964q-.277.191-.486.459c-.901 1.153-.472 2.87.386 6.301c.545 2.183.818 3.274 1.632 3.91C6.31 21 7.435 21 9.685 21h4.63c2.25 0 3.375 0 4.189-.635c.814-.636 1.086-1.727 1.632-3.91c.858-3.432 1.287-5.147.386-6.301a2.2 2.2 0 0 0-.487-.46l-.513-2.962l-.046-.17c-.237-.872-.41-1.506-.776-2a3.25 3.25 0 0 0-1.426-1.089c-.476-.186-1.009-.217-1.692-.222A1.75 1.75 0 0 0 14 2.25zm8.418 6.896l-.362-2.088c-.283-1.04-.386-1.367-.56-1.601a1.75 1.75 0 0 0-.768-.587c-.22-.086-.486-.111-1.148-.118A1.75 1.75 0 0 1 14 5.75h-4a1.75 1.75 0 0 1-1.58-.998c-.663.007-.928.032-1.148.118a1.75 1.75 0 0 0-.768.587c-.174.234-.277.56-.56 1.6l-.362 2.089C6.58 9 7.91 9 9.685 9h4.63c1.775 0 3.105 0 4.103.146M8 12.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75m8.75.75a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zM12 12.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75" clipRule="evenodd" /></svg>
                                                <h1 className='text-sm font-dm_sans font-medium'>Order</h1>
                                            </div>
                                            <div className='flex gap-3 items-center py-[6px] px-1 cursor-pointer rounded-md hover:bg-bulk-white' onClick={(e) => { e.stopPropagation(), signOut() }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#7b6868" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z" /></svg>
                                                <h1 className='text-sm font-dm_sans font-semibold'>Sign Out</h1>
                                            </div>

                                        </section>

                                    </div>}
                                </div>
                                :
                                <h1 className={`text-[16px] font-semibold font-dm_sans hover:text-blue-700 cursor-pointer ${path === "/" ? "text-blue-700" : ""}`} onClick={() => setShowLogIn(!showLogIn)}>LogIn</h1>
                        }
                    </div>
                    {/* menu */}
                    <section className='relative block pr-6 cursor-pointer md:hidden' onClick={() => setShowForm(prev => ({ ...prev, mobileMenu: !prev.mobileMenu }))}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#797070" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" /></svg>

                    </section>


                </div>

                <div ref={closeUserPopUP} className={`fixed right-0 top-0 z-[100] w-[60vw] h-screen bg-white shadow-md transition-all duration-500 ease-in-out ${showForm.mobileMenu ? "opacity-100 translate-x-0" : " opacity-0 translate-x-full "}`}>
                    <div className='flex flex-col gap-1 px-2 py-10'>
                        {viewMobileLink.map((element, index) => (
                            <div className='py-2 hover:bg-gray-100 px-2 rounded-md' key={index} onClick={() => setShowForm(prev => ({ ...prev, mobileMenu: !prev.mobileMenu }))}>
                                <h1 onClick={() => router.push(element.link)}>{element.title}</h1>
                            </div>

                        ))}

                    </div>
                </div>

            </main>


        </div >
    )
}

export default Header