"use client"
import { errorToast, successToast } from '../../../../reuseComponents/ReactToast'
import useChangePassword from '../../../../services/admin/useChangePassword'
import React, { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const ResetPassword = () => {
    const { successPassword, errorPassword, passwordUpate } = useChangePassword()
    const [showPass, setShowPass] = useState({
        pass: false,
        newPass: false,
        confirmPass: false,
    })
    const [updatePassword, setUpdatePassword] = useState({
        password: "",
        newPassword: "",
        confirmPassword: ""
    })

    const changePassword = (e) => {
        e.preventDefault()
        passwordUpate(updatePassword)
    }

    useEffect(() => {
        if (successPassword) {
            successToast(successPassword)
            setUpdatePassword({ password: "", newPassword: "", confirmPassword: "" })
        }
        if (errorPassword) {
            errorToast(errorPassword)
        }
    }, [successPassword, errorPassword])
    return (

        <div className='flex flex-col w-full gap-4 my-2 px-4'>
            <header className='flex flex-col gap-1 border-b border-b-gray-400 pb-2'>
                <h1 className='text-[16px] md:text-xl font-medium'>Change Password</h1>
                <h1 className='text-[12px] md:text-sm text-gray-500 '>It is recommeded user to put a strong password to maintain a strong security!</h1>
            </header>


            <form className='gap-5 flex flex-col  w-full sm:w-[300px] mt-8' onSubmit={changePassword}>

                <section className='relative flex gap-1 flex-col'>
                    <label htmlFor="" className='text-gray-500 font-medium'>Current Password</label>
                    <input value={updatePassword.password} className=' border-gray-600 border-2 px-2 outline-none rounded-md py-[8px]' type={showPass.pass ? "text" : "password"} placeholder='*************' onChange={(e) => setUpdatePassword((previous) => ({ ...previous, password: e.target.value }))} />

                    <div className='absolute top-10 right-6'>
                        {showPass.pass ?
                            <Eye size={18} color='#5d5656' className='cursor-pointer' onClick={() => setShowPass((prev) => ({ ...prev, pass: false }))} /> : <EyeOff size={18} color='#5d5656' className='cursor-pointer' onClick={() => setShowPass((prev) => ({ ...prev, pass: true }))} />}
                    </div>
                </section>
                <section className='relative flex gap-1 flex-col'>
                    <label htmlFor="" className='text-gray-500 font-medium'>New Password</label>
                    <input value={updatePassword.newPassword} className=' border-gray-600 border-2 px-2 outline-none rounded-md py-[8px]' type={showPass.newPass ? "text" : "password"} placeholder='*************' onChange={(e) => setUpdatePassword((previous) => ({ ...previous, newPassword: e.target.value }))} />
                    <div className='absolute top-10 right-6'>
                        {showPass.newPass ?
                            <Eye size={18} color='#5d5656' className='cursor-pointer' onClick={() => setShowPass((prev) => ({ ...prev, newPass: false }))} /> : <EyeOff size={18} color='#5d5656' className='cursor-pointer' onClick={() => setShowPass((prev) => ({ ...prev, newPass: true }))} />}
                    </div>
                </section>
                <section className='relative flex gap-1 flex-col'>
                    <label htmlFor="" className='text-gray-500 font-medium'>Confirm Password</label>
                    <input value={updatePassword.confirmPassword} className=' border-gray-600 border-2 px-2 outline-none rounded-md py-[8px]' type={showPass.confirmPass ? "text" : "password"} placeholder='*************' onChange={(e) => setUpdatePassword((previous) => ({ ...previous, confirmPassword: e.target.value }))} />
                    <div className='absolute top-10 right-6'>
                        {showPass.confirmPass ?
                            <Eye size={18} color='#5d5656' className='cursor-pointer' onClick={() => setShowPass((prev) => ({ ...prev, confirmPass: false }))} /> : <EyeOff size={18} color='#5d5656' className='cursor-pointer' onClick={() => setShowPass((prev) => ({ ...prev, confirmPass: true }))} />}
                    </div>

                </section>

                <button type="submit" className='bg-slate-600 hover:bg-slate-500 py-[10px] cursor-pointer px-3 w-[60%] rounded-md text-white font-medium'>Change Password</button>
            </form>
        </div>
    )
}

export default ResetPassword