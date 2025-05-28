'use client'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useSearchFood from '../services/users/useSearchFood'
import { useRouter } from 'next/navigation'

const Header = () => {
    const path = usePathname()
    const router = useRouter()
    const [search, setSearch] = useState(null)

    const { searchFood, errorSearchFood, getSearchFood } = useSearchFood()

    useEffect(() => {

        if (search) {
            const timer = setTimeout(() => {
                getSearchFood(search)

            }, 500)
            return () => clearTimeout(timer)
        }

    }, [search])


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
                <h1 className={`text-[16px] font-medium font-dm_sans hover:text-blue-700 cursor-pointer ${path === "/" ? "text-blue-700" : ""}`}>Signup</h1>

            </section>

        </div>
    )
}

export default Header