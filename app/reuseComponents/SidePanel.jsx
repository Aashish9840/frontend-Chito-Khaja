'use client'
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 16v-5q0-.425.288-.712T6 10t.713.288T7 11v5q0 .425-.288.713T6 17t-.712-.288T5 16m6 0v-5q0-.425.288-.712T12 10t.713.288T13 11v5q0 .425-.288.713T12 17t-.712-.288T11 16m-8 5q-.425 0-.712-.288T2 20t.288-.712T3 19h18q.425 0 .713.288T22 20t-.288.713T21 21zm14-5v-5q0-.425.288-.712T18 10t.713.288T19 11v5q0 .425-.288.713T18 17t-.712-.288T17 16m4-8H2.9q-.375 0-.638-.262T2 7.1v-.55q0-.275.138-.475T2.5 5.75l8.6-4.3q.425-.2.9-.2t.9.2l8.55 4.275q.275.125.413.375t.137.525V7q0 .425-.287.713T21 8" /></svg>
                        Food Items
                    </Link>

                    <Link
                        href='/admin/dashboard/add-food'
                        className={`flex gap-[20px] hover:bg-gray-200 py-2 items-center justify-start pl-2 md:pl-8 ${pathName === "/admin/dashboard/add-food" ? "bg-gray-100" : "bg-none"
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 21q-.825 0-1.412-.587T4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21zm4.5-3q.2 0 .35-.15t.15-.35V14q.625 0 1.063-.437T12.5 12.5V10q0-.2-.15-.35T12 9.5t-.35.15t-.15.35v2.5H11V10q0-.2-.15-.35t-.35-.15t-.35.15T10 10v2.5h-.5V10q0-.2-.15-.35T9 9.5t-.35.15t-.15.35v2.5q0 .625.438 1.063T10 14v3.5q0 .2.15.35t.35.15m4 0q.2 0 .35-.15t.15-.35v-7.35q0-.275-.187-.462T14.35 9.5q-.675 0-1.012.625T13 11.5v2q0 .4.363.563T14 14.5v3q0 .2.15.35t.35.15" /></svg>
                        Add Food
                    </Link>
                    <Link
                        href='/admin/dashboard/order'
                        className={` flex gap-[20px] hover:bg-gray-200 py-2 items-center justify-start pl-2 md:pl-8 ${pathName === "/admin/dashboard/order" ? "bg-gray-100 " : "bg-none"
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M0 1h4.764l.545 2h18.078l-3.666 11H7.78l-.5 2H22v2H4.72l1.246-4.989L3.236 3H0zm4 20a2 2 0 1 1 4 0a2 2 0 0 1-4 0m14 0a2 2 0 1 1 4 0a2 2 0 0 1-4 0" /></svg>
                        <h1 className='text-[16px]'>Order</h1>
                    </Link>
                    <Link
                        href='/admin/dashboard/userlist'
                        className={` flex gap-[20px] hover:bg-gray-200 py-2 items-center justify-start pl-2 md:pl-8 ${pathName === "/admin/dashboard/userlist" ? "bg-gray-100 " : "bg-none"
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7" /></svg>
                        User List
                    </Link>
                    <Link
                        href='/admin/dashboard/settings'
                        className={` flex gap-[20px] hover:bg-gray-200 py-2 items-center justify-start pl-2 md:pl-8 ${pathName === "/admin/dashboard/settings" ? "bg-gray-100 " : "bg-none"
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48"><defs><mask id="ipSSetting0"><g fill="none" strokeLinejoin="round" strokeWidth="4"><path fill="#fff" stroke="#fff" d="M36.686 15.171a15.4 15.4 0 0 1 2.529 6.102H44v5.454h-4.785a15.4 15.4 0 0 1-2.529 6.102l3.385 3.385l-3.857 3.857l-3.385-3.385a15.4 15.4 0 0 1-6.102 2.529V44h-5.454v-4.785a15.4 15.4 0 0 1-6.102-2.529l-3.385 3.385l-3.857-3.857l3.385-3.385a15.4 15.4 0 0 1-2.529-6.102H4v-5.454h4.785a15.4 15.4 0 0 1 2.529-6.102l-3.385-3.385l3.857-3.857l3.385 3.385a15.4 15.4 0 0 1 6.102-2.529V4h5.454v4.785a15.4 15.4 0 0 1 6.102 2.529l3.385-3.385l3.857 3.857z" /><path fill="#000" stroke="#000" d="M24 29a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z" /></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSSetting0)" /></svg>
                        <h1 className='text-[16px]'>Settings</h1>
                    </Link>
                </div>
            </div>
        </section>

    )
}

export default SidePanel