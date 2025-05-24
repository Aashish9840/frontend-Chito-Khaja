"use client"
import React, { useEffect, useState } from 'react'
import SidePanel from '../../../reuseComponents/SidePanel'
import AdminInfo from '../../../reuseComponents/AdminInfo'
import useGetAdminInfor from '../../../services/admin/useGetAdminInfo'
import useGetAdminInfo from '../../../services/admin/useGetAdminInfo'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import useUpdateInformation from '../../../services/admin/useUpdateInformation'
import { errorToast, successToast } from '../../../reuseComponents/ReactToast'
import useChangePassword from '../../../services/admin/useChangePassword'
import { Eye, EyeOff } from 'lucide-react'

const page = () => {
    const settingList = ["General", "Security", "Order Notification", "Help"]
    const [showList, setShowList] = useState("General")
    const [edit, setEdit] = useState(false)
    const [showPass, setShowPass] = useState({
        pass: false,
        newPass: false,
        confirmPass: false,
    })
    const { adminInfo, errorAdminInfo, getAdminInfo } = useGetAdminInfo()
    const { successInfoUpdate, errorInfoUpdate, userInfoUpdate } = useUpdateInformation()
    const { successPassword, errorPassword, passwordUpate } = useChangePassword()

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm()

    const [updatePassword, setUpdatePassword] = useState({
        password: "",
        newPassword: "",
        confirmPassword: ""
    })

    useEffect(() => {
        getAdminInfo()
    }, [successInfoUpdate])



    useEffect(() => {
        if (adminInfo) {
            reset({
                userName: adminInfo.userName || '',
                address: adminInfo.address || '',
                married: adminInfo.married || '',
                education: adminInfo.education || '',
                gender: adminInfo.gender || '',
                country: adminInfo.country || '',
                phone: adminInfo.phone || '',
                date: adminInfo.date || ''
            });
        }
    }, [adminInfo]);

    const editForm = (data) => {
        setEdit(false)
        userInfoUpdate(data)
    }
    useEffect(() => {
        if (successInfoUpdate) {
            successToast(successInfoUpdate)
        }
        if (errorInfoUpdate) {
            successToast(errorInfoUpdate)
        }

    }, [successInfoUpdate, errorInfoUpdate])


    const changePassword = (e) => {
        e.preventDefault()
        passwordUpate(updatePassword)
    }

    useEffect(() => {
        if (successPassword) {
            successToast(successPassword)
        }
        if (errorPassword) {
            errorToast(errorPassword)
        }

    }, [successPassword, errorPassword])
    return (
        <div className="flex min-h-screen">
            <SidePanel />
            <section className="w-full md:w-[85%] bg-slate-50 max-h-[screen] h-[90vh]">
                <AdminInfo />
                <div className='flex w-full h-full gap-3'>
                    <section className='w-[25vw] sm:w-[20vw] border-r flex flex-col gap-5 border-r-gray-300 p-1 sm:p-3 md:p-8'>
                        {settingList.map((list, index) => (
                            <h1 key={index} className={`py-2 ${showList === list ? "bg-gray-300 text-blue-700" : ""} hover:bg-gray-300 hover:text-blue-700 font-medium px-2 sm:px-4 text-[14px] sm:text-sm rounded-lg`} onClick={() => setShowList(list)}>{list}</h1>
                        ))}
                    </section>
                    <div className='w-full md:p-8'>
                        {showList === "General" && <div className='flex gap-3 flex-col w-full lg:m-4'>
                            <section className='flex gap-[6px] items-center '>
                                <h1 className='p-4 rounded-[50%] w-fit bg-slate-200 text-blue-700 font-medium'>
                                    {adminInfo?.userName.substring(0, 2).toUpperCase()}
                                </h1>
                                <div>
                                    <h1 className='text-sm font-medium'>{adminInfo?.userName}</h1>
                                    <h1 className='text-[12px] font-medium text-slate-500'>{adminInfo?.email}</h1>

                                </div>

                            </section>

                            <section className='mt-5 w-full'>

                                <h2 className="text-2xl font-medium text-gray-800">Personal Information</h2>

                                <div className="relative w-full xl:w-[90%] mt-2 bg-white px-6 lg:pr-[100px] xl:pr-[200px] py-10 rounded-2xl shadow-lg">

                                    {edit ?
                                        <button type="submit" form="admin-edit-form" className='absolute top-5 right-10 px-8 py-2 rounded-lg bg-blue-600 cursor-pointer text-white' >Save</button> :
                                        <button className='absolute top-5 right-10 px-8 py-2 rounded-lg bg-blue-600 cursor-pointer text-white' onClick={(e) => { e.preventDefault(), setEdit(true) }}>Edit </button>}



                                    {edit ? <form id="admin-edit-form" className=" flex flex-col gap-4 sm:gap-8 w-full" onSubmit={handleSubmit(editForm)}>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 w-full">
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-1">Name</label>
                                                <input
                                                    type="text"

                                                    className="w-full p-[6px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    {...register("userName")}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-1">Address</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-[6px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    {...register("address")} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8">
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-1">Gender</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-[6px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    {...register("gender")}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-1">Country</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-[6px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    {...register("country")}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8">
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-1">Education</label>
                                                <input type="text"
                                                    className="w-full p-[6px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    {...register("education")}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-1">Marital Status</label>
                                                <input type="text"

                                                    className="w-full p-[6px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    {...register("married")}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-8">
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                                                <input type="text"
                                                    className="w-full p-[6px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    {...register("phone")}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
                                                <input type="text"
                                                    {...register("date")}
                                                    className="w-full p-[6px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            </div>
                                        </div>
                                    </form> :
                                        <div className="flex flex-col gap-4 w-full">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8">
                                                <div>
                                                    <label className="block text-black font-medium mb-1">Name</label>
                                                    <h1 className="text-gray-600 font-medium text-sm" > {adminInfo?.userName}</h1>
                                                </div>
                                                <div>
                                                    <label className="block text-black font-medium mb-1">Address</label>
                                                    <h1 className="text-gray-600 font-medium text-sm" > {adminInfo?.address}</h1>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8">
                                                <div>
                                                    <label className="block text-black font-medium mb-1">Gender</label>
                                                    <h1 className="text-gray-600 font-medium text-sm" > {adminInfo?.gender}</h1>
                                                </div>
                                                <div>
                                                    <label className="block text-black font-medium mb-1">Country</label>
                                                    <h1 className="text-gray-600 font-medium text-sm" > {adminInfo?.country}</h1>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8">
                                                <div>
                                                    <label className="block text-black font-medium mb-1">Education</label>
                                                    <h1 className="text-gray-600 font-medium text-sm" > {adminInfo?.education}</h1>
                                                </div>
                                                <div>
                                                    <label className="block text-black font-medium mb-1">Marital Status</label>
                                                    <h1 className="text-gray-600 font-medium text-sm" > {adminInfo?.married}</h1>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8">
                                                <div>
                                                    <label className="block text-black font-medium mb-1">Phone Number</label>
                                                    <h1 className="text-gray-600 font-medium text-sm" > {adminInfo?.phone}</h1>
                                                </div>
                                                <div>
                                                    <label className="block text-black font-medium mb-1">Date of Birth</label>
                                                    <h1 className="text-gray-600 font-medium text-sm" > {adminInfo?.date.split("T")[0]}</h1>
                                                </div>
                                            </div>
                                        </div>}

                                </div>
                            </section>
                        </div>}

                        {

                            showList === "Security" &&

                            <div className='flex flex-col w-full gap-4 my-2 px-4'>
                                <header className='flex flex-col gap-1 border-b border-b-gray-400 pb-2'>
                                    <h1 className='text-[16px] md:text-xl font-medium'>Change Password</h1>
                                    <h1 className='text-[12px] md:text-sm text-gray-500 '>It is recommeded user to put a strong password to maintain a strong security!</h1>
                                </header>


                                <form className='gap-5 flex flex-col  w-full sm:w-[300px] mt-8' onSubmit={changePassword}>

                                    <section className='relative flex gap-1 flex-col'>
                                        <label htmlFor="" className='text-gray-500 font-medium'>Current Password</label>
                                        <input className=' border-gray-600 border-2 px-2 outline-none rounded-md py-[8px]' type={showPass.pass ? "text" : "password"} placeholder='*************' onChange={(e) => setUpdatePassword((previous) => ({ ...previous, password: e.target.value }))} />

                                        <div className='absolute top-10 right-6'>
                                            {showPass.pass ?
                                                <Eye size={18} color='#5d5656' className='cursor-pointer' onClick={() => setShowPass((prev) => ({ ...prev, pass: false }))} /> : <EyeOff size={18} color='#5d5656' className='cursor-pointer' onClick={() => setShowPass((prev) => ({ ...prev, pass: true }))} />}
                                        </div>
                                    </section>
                                    <section className='relative flex gap-1 flex-col'>
                                        <label htmlFor="" className='text-gray-500 font-medium'>New Password</label>
                                        <input className=' border-gray-600 border-2 px-2 outline-none rounded-md py-[8px]' type={showPass.newPass ? "text" : "password"} placeholder='*************' onChange={(e) => setUpdatePassword((previous) => ({ ...previous, newPassword: e.target.value }))} />
                                        <div className='absolute top-10 right-6'>
                                            {showPass.newPass ?
                                                <Eye size={18} color='#5d5656' className='cursor-pointer' onClick={() => setShowPass((prev) => ({ ...prev, newPass: false }))} /> : <EyeOff size={18} color='#5d5656' className='cursor-pointer' onClick={() => setShowPass((prev) => ({ ...prev, newPass: true }))} />}
                                        </div>
                                    </section>
                                    <section className='relative flex gap-1 flex-col'>
                                        <label htmlFor="" className='text-gray-500 font-medium'>Confirm Password</label>
                                        <input className=' border-gray-600 border-2 px-2 outline-none rounded-md py-[8px]' type={showPass.confirmPass ? "text" : "password"} placeholder='*************' onChange={(e) => setUpdatePassword((previous) => ({ ...previous, confirmPassword: e.target.value }))} />
                                        <div className='absolute top-10 right-6'>
                                            {showPass.confirmPass ?
                                                <Eye size={18} color='#5d5656' className='cursor-pointer' onClick={() => setShowPass((prev) => ({ ...prev, confirmPass: false }))} /> : <EyeOff size={18} color='#5d5656' className='cursor-pointer' onClick={() => setShowPass((prev) => ({ ...prev, confirmPass: true }))} />}
                                        </div>

                                    </section>

                                    <button type="submit" className='bg-slate-600 hover:bg-slate-500 py-[10px] cursor-pointer px-3 w-[60%] rounded-md text-white font-medium'>Change Password</button>
                                </form>
                            </div>
                        }


                    </div>


                </div>

            </section>
        </div>
    )
}

export default page