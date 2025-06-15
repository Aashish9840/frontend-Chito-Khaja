'use client'
import useGetAdminInfo from '../../../../services/admin/useGetAdminInfo'
import useUpdateInformation from '../../../../services/admin/useUpdateInformation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { errorToast, successToast } from '../../../../reuseComponents/ReactToast'

const General = () => {
    const [edit, setEdit] = useState(false)

    const { adminInfo, errorAdminInfo, getAdminInfo } = useGetAdminInfo()
    const { successInfoUpdate, errorInfoUpdate, userInfoUpdate } = useUpdateInformation()

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm()



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
            errorToast(errorInfoUpdate)
        }

    }, [successInfoUpdate, errorInfoUpdate])


    return (
        <div className='flex gap-3 flex-col w-full lg:m-4'>
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
                        <button type="submit" form="admin-edit-form" className='absolute top-3 right-6 px-8 py-2 rounded-lg bg-blue-600 cursor-pointer text-white' >Save</button> :
                        <button className='absolute top-3 right-6 px-8 py-2 rounded-lg bg-blue-600 cursor-pointer text-white' onClick={(e) => { e.preventDefault(), setEdit(true) }}>Edit </button>}



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

                        <div className="grid grid-cols-2 gap-3 sm:gap-8">
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

                        <div className="grid grid-cols-2 gap-3 sm:gap-8">
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

                        <div className="grid grid-cols-2 gap-5 lg:gap-8">
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
                            <div className="grid grid-cols-2 gap-3 sm:gap-8">
                                <div>
                                    <label className="block text-black font-medium mb-1">Name</label>
                                    <h1 className="text-gray-600 font-medium text-sm" > {adminInfo?.userName}</h1>
                                </div>
                                <div>
                                    <label className="block text-black font-medium mb-1">Address</label>
                                    <h1 className="text-gray-600 font-medium text-sm" > {adminInfo?.address}</h1>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:gap-8">
                                <div>
                                    <label className="block text-black font-medium mb-1">Gender</label>
                                    <h1 className="text-gray-600 font-medium text-sm" > {adminInfo?.gender}</h1>
                                </div>
                                <div>
                                    <label className="block text-black font-medium mb-1">Country</label>
                                    <h1 className="text-gray-600 font-medium text-sm" > {adminInfo?.country}</h1>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:gap-8">
                                <div>
                                    <label className="block text-black font-medium mb-1">Education</label>
                                    <h1 className="text-gray-600 font-medium text-sm" > {adminInfo?.education}</h1>
                                </div>
                                <div>
                                    <label className="block text-black font-medium mb-1">Marital Status</label>
                                    <h1 className="text-gray-600 font-medium text-sm" > {adminInfo?.married}</h1>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:gap-8">
                                <div>
                                    <label className="block text-black font-medium mb-1">Phone Number</label>
                                    <h1 className="text-gray-600 font-medium text-sm" > {adminInfo?.phone}</h1>
                                </div>
                                <div>
                                    <label className="block text-black font-medium mb-1">Date of Birth</label>
                                    <h1 className="text-gray-600 font-medium text-sm" > {adminInfo?.date?.split("T")[0]}</h1>
                                </div>
                            </div>
                        </div>}

                </div>
            </section>
        </div>
    )
}

export default General