'use client'
import { Dessert, Settings, ShoppingBasket, ShoppingCart, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
const SidePanel = () => {
    const pathName = usePathname()

    return (

        <section className=" hidden w-[15%] min-w-[200px] md:block border-r border-r-gray-300 cursor-pointer ">
            <Link href="/" className="flex justify-start items-center my-5">
                <Image
                    src="/admin/food_logo.jpg"
                    alt="logo"
                    height={200}
                    width={200}
                    className="h-[40px] w-[40px] md:h-[60px] md:w-[60px]"
                />
                <h1 className={` text-[14px] md:text-xl font-bold`}>Chito Khaja</h1>
            </Link>

            <div className="flex flex-col justify-between h-[75vh]">
                <div className="flex gap-4 flex-col w-full">
                    <Link href='/admin/dashboard'
                        className={` flex gap-[20px] hover:bg-gray-200 py-2 items-center justify-start pl-2 md:pl-8 ${pathName === "/admin/dashboard" ? "bg-gray-100" : "bg-none"
                            }`}
                    >
                        <ShoppingBasket size={22} />
                        Food Items
                    </Link>

                    <Link
                        href='/admin/dashboard/add-food'
                        className={`flex gap-[20px] hover:bg-gray-200 py-2 items-center justify-start pl-2 md:pl-8 ${pathName === "/admin/dashboard/add-food" ? "bg-gray-100" : "bg-none"
                            }`}
                    >
                        <Dessert size={22} />
                        Add Food
                    </Link>
                    <Link
                        href='/admin/dashboard/order'
                        className={` flex gap-[20px] hover:bg-gray-200 py-2 items-center justify-start pl-2 md:pl-8 ${pathName === "/admin/dashboard/order" ? "bg-gray-100 " : "bg-none"
                            }`}
                    >
                        <ShoppingCart size={22} />
                        <h1 className='text-[16px]'>Order</h1>
                    </Link>
                    <Link
                        href='/admin/dashboard/userlist'
                        className={` flex gap-[20px] hover:bg-gray-200 py-2 items-center justify-start pl-2 md:pl-8 ${pathName === "/admin/dashboard/userlist" ? "bg-gray-100 " : "bg-none"
                            }`}
                    >
                        <UserRound size={22} />
                        User List
                    </Link>
                    <Link
                        href='/admin/dashboard/settings'
                        className={` flex gap-[20px] hover:bg-gray-200 py-2 items-center justify-start pl-2 md:pl-8 ${pathName === "/admin/dashboard/settings" ? "bg-gray-100 " : "bg-none"
                            }`}
                    >
                        <Settings size={22} />
                        <h1 className='text-[16px]'>Settings</h1>
                    </Link>
                </div>
            </div>
        </section>

    )
}

export default SidePanel