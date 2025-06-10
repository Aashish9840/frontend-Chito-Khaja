'use client'
import { LogOut, Settings, UserPen } from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { userContext } from '../ContextAPI/IsAuthContext'
import useLogOut from '../services/admin/useLogOut'
import { errorToast, successToast } from './ReactToast'
import Link from 'next/link'

const AdminInfo = () => {
    const removeAdminInfo = useRef(null)
    const [user, setUser] = useState(false)
    const { authUser, callContext, setCallContext } = useContext(userContext)

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
            if (!removeAdminInfo?.current.contains(e.target)) {
                setUser(false)
            }
        }
        document.addEventListener("mousedowm", adminRemove)
    }, [])
    return (
        <div className="py-4 h-fit border-b px-[40px] border-b-gray-200 flex justify-end">
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