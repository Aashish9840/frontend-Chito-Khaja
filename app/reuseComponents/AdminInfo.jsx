'use client'
import { AlignJustify, LogOut, Settings, UserPen } from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { userContext } from '../ContextAPI/IsAuthContext'
import useLogOut from '../services/admin/useLogOut'
import { errorToast, successToast } from './ReactToast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMenu } from '../ContextAPI/SetMenu'

const AdminInfo = () => {

    const router = useRouter()
    const removeAdminInfo = useRef(null)
    const [user, setUser] = useState(false)

    const [showMenu, setShowMenu] = useState(false)


    const { authUser, callContext, setCallContext } = useContext(userContext)
    const { customMenuStyle, setCustomMenuStyle } = useContext(useMenu)
    const { errorLogOut, successLogOut, adminLogOut } = useLogOut()

    useEffect(() => {
        if (successLogOut) {
            successToast(successLogOut)
            setCallContext(!callContext)
            setUser(false)

        }
        if (errorLogOut) {
            errorToast(errorLogOut)
        }
    }, [successLogOut, errorLogOut])

    useEffect(() => {
        const adminRemove = (e) => {
            console.log("hello guys")
            if (!removeAdminInfo?.current?.contains(e.target)) {
                setUser(false)
                setCustomMenuStyle(false)

            }
        }
        document.addEventListener("mousedown", adminRemove)
        return () => {
            document.removeEventListener("mousedown", adminRemove);
        };
    }, [])

    const adminLink = [
        {
            title: "FoodList",
            link: '/admin/dashboard'
        },
        {
            title: "Add Food",
            link: '/admin/dashboard/add-food'
        },
        {
            title: "Order",
            link: '/admin/dashboard/order'
        },
        {
            title: "User List",
            link: '/admin/dashboard/userlist'
        },
        {
            title: "Setting",
            link: '/admin/dashboard/settings'
        },

    ]
    return (
        <div className=" py-4 h-fit border-b px-[40px] border-b-gray-200 flex items-center justify-between md:justify-end">
            <section className='block md:hidden cursor-pointer' >
                <AlignJustify size={26} onClick={() => setShowMenu(!showMenu)} className='cursor-pointer' />
            </section>

            {/* show menu list in mobile view */}

            <section ref={removeAdminInfo} className={` fixed inset-0 w-[50vw] bg-white  shadow-lg transition-all duration-500 ease-out ${showMenu ? "translate-x-0 z-[100] " : "-translate-x-full opacity-0"} `}>

                <div className='flex flex-col gap-2 py-6'>

                    {
                        adminLink.map((link, index) => (

                            <div key={index} onClick={() => { router.push(link.link), setCustomMenuStyle(link.title) }}>
                                <h1 className={`px-4 py-2 hover:bg-gray-100 ${customMenuStyle === link.title ? "bg-gray-100" : "bg-none"} cursor-pointer font-dm_sans text-lg`}>{link.title}</h1>
                            </div>
                        ))
                    }
                </div>

            </section>

            <section className='relative'>
                <div className='rounded-[100%] flex items-center justify-center p-2 bg-gray-300 cursor-pointer' onClick={() => { setUser(!user) }}>
                    <h1 className='text-white font-semibold font-dm_sans text-base'>{authUser?.userName?.substring(0, 2).toUpperCase()}</h1>
                </div>
                {user && authUser && <div ref={removeAdminInfo} className='absolute right-[10px] rounded-md top-full w-[150px] min-h-[180px] overflow-y-auto shadow-md z-20 bg-white flex flex-col'>


                    <section className='flex flex-col border-b border-b-gray-200 px-2 py-4'>
                        <h1 className='text-[14px] font-semibold'>{authUser.userName}</h1>
                        <h1 className='text-[12px] font-medium'>{authUser.email}</h1>
                    </section>
                    <div className='my-2'>
                        <Link href='/admin/dashboard/settings' className='flex items-center px-5 justify-start gap-3 hover:bg-gray-100 cursor-pointer py-2'>
                            <Settings size={18} />
                            <h1 className='text-[14px] font-normal'>Settings</h1>
                        </Link>

                        <div className='flex items-center px-5 justify-start gap-3 hover:bg-gray-100 cursor-pointer py-2'>
                            <UserPen size={18} />
                            <h1 className='text-[14px] font-normal'>Edit Profile</h1>
                        </div>
                        <div className='flex items-center px-5 justify-start gap-3 hover:bg-gray-100 cursor-pointer py-2'>
                            <LogOut size={18} />
                            <h1 className='text-[14px] font-normal' onClick={() => { adminLogOut() }}>Sign Out</h1>
                        </div>
                    </div>
                </div>}
            </section>
        </div>
    )
}

export default AdminInfo