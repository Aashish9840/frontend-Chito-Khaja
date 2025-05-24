'use client'
import React, { useEffect, useState } from 'react'
import SidePanel from "../../../reuseComponents/SidePanel";
import AdminInfo from "../../../reuseComponents/AdminInfo";
import DeleteDialogue from "../../../reuseComponents/DeleteDialogue";
import * as Popover from '@radix-ui/react-popover'
import { Ellipsis, SquarePen, Trash2, UserRoundPen } from 'lucide-react';
import useGetAllUsers from '../../../services/admin/useGetAllUsers';
import useDeleteUser from '../../../services/admin/useDeleteUser';
import { errorToast, successToast } from '../../../reuseComponents/ReactToast'
import useUpdateRole from '../../../services/admin/useUpdateRole';
const page = () => {
    const [openPopoverIndex, setOpenPopoverIndex] = useState(null)
    const [dialogue, setDialogue] = useState(false)
    const [password, setPassword] = useState(null)
    const [user, setUser] = useState(null)
    const { users, errorUser, getUser } = useGetAllUsers()
    const { successRoleUpdate, errorRoleUpdate, roleUpdate } = useUpdateRole()
    const { successUserDelete, errorUserDelete, getUserDelete } = useDeleteUser()
    useEffect(() => {
        getUser()
    }, [successUserDelete, successRoleUpdate])

    useEffect(() => {
        if (successUserDelete) {
            successToast(successUserDelete)
            setDialogue(false)
            setPassword(null)
            setUser(null)
        }
        if (errorUserDeletegt) {
            errorToast(errorUserDelete)
        }
    }, [successUserDelete, errorUserDelete])
    useEffect(() => {

        if (successRoleUpdate) {
            return successToast(successRoleUpdate)
        }
        if (errorRoleUpdate) {
            return errorToast(errorRoleUpdate)
        }
    }, [successRoleUpdate, errorRoleUpdate])


    return (
        <div className="flex min-h-screen">
            <SidePanel />
            <div className="w-full md:w-[85%] bg-slate-50">
                <AdminInfo />

                <h1 className="text-base px-5 pt-5 font-medium">
                    Users list
                </h1>
                <div className="w-full px-7 mt-5">
                    <div className="overflow-auto custom-scroll max-h-[580px]">
                        <table className='w-full'>
                            <thead className="bg-green-400">
                                <tr>
                                    <th className="py-4 px-8 text-start text-[#FFF] font-medium">User Name</th>
                                    <th className="py-4 px-8 text-start text-[#FFF] font-medium">Email</th>
                                    <th className="py-4 px-8 text-start text-[#FFF] font-medium">Role</th>
                                    <th className="py-4 px-8 text-start text-[#FFF] font-medium">Cart Items</th>
                                    <th className="py-4 px-8 text-start text-[#FFF] font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user, index) => (
                                    <tr key={index}>
                                        <td className="border-t py-4 px-8 border-gray-100">{user.userName}</td>
                                        <td className="border-t py-4 px-8 border-gray-100">{user.email}</td>
                                        <td className="border-t py-4 px-8 border-gray-100">{user.role}</td>
                                        <td className="border-t py-4 px-8 border-gray-100">{user.cardData?.length}</td>
                                        <td className="border-t py-4 px-8 border-gray-100 flex items-center justify-start">
                                            <Popover.Root open={openPopoverIndex === index} onOpenChange={(open) => setOpenPopoverIndex(open ? index : null)}>
                                                <Popover.Trigger asChild>
                                                    <button className='cursor-pointer'>
                                                        <Ellipsis />
                                                    </button>
                                                </Popover.Trigger>
                                                <Popover.Portal>
                                                    <Popover.Content
                                                        className="w-[200px] rounded bg-white border-white p-2 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
                                                        sideOffset={5}
                                                    >
                                                        <div className="flex flex-col gap-1 border-none ">
                                                            <div className="flex gap-4 items-center mt-2 pl-3 hover:bg-slate-100 py-1" onClick={(e) => { setOpenPopoverIndex(null), roleUpdate(user._id, "admin") }}>
                                                                <UserRoundPen color="#172ede" size={18} />
                                                                <h1>Update as Admin</h1>
                                                            </div>
                                                            <div className="flex gap-4 items-center pl-3 hover:bg-slate-100 py-1 " onClick={() => { setOpenPopoverIndex(null), setUser(user._id), setDialogue(true) }} >
                                                                <Trash2 color="#e82c2c" size={16} />
                                                                <h1>Delete</h1>
                                                            </div>


                                                        </div>

                                                    </Popover.Content>
                                                </Popover.Portal>
                                            </Popover.Root>

                                        </td>
                                    </tr>
                                ))}

                            </tbody>


                        </table>


                    </div>

                    {dialogue &&

                        <DeleteDialogue
                            dialogue={dialogue}
                            setDialogue={setDialogue}
                            deletefunction={getUserDelete}
                            password={password}
                            setPassword={setPassword}
                            id={user}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default page