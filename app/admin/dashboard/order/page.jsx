'use client'
import React, { useEffect, useRef, useState } from 'react'
import SidePanel from '../../../reuseComponents/SidePanel'
import AdminInfo from '../../../reuseComponents/AdminInfo'
import * as Popover from '@radix-ui/react-popover'
import useGetOrder from '../../../services/admin/useGetOrder'
import { Ellipsis, EllipsisVertical, Trash2, UserRoundPen } from 'lucide-react'
import DeleteDialogue from '../../../reuseComponents/DeleteDialogue'
import useDeleteOrder from '../../../services/admin/useDeleteOrder'
import { errorToast, successToast } from '../../../reuseComponents/ReactToast'
import useUpdateOrderStatus from '../../../services/admin/useUpdateOrderStatus'
import * as Dialog from "@radix-ui/react-dialog"
import useOrderReport from '../../../services/admin/useOrderReport'
const page = () => {

    const [openPopoverIndex, setOpenPopoverIndex] = useState(null)
    const [orderId, setOrderId] = useState(null)
    const [password, setPassword] = useState(null)
    const [dialogue, setDialogue] = useState(false)
    const [showStatusUpdate, setShowStatusUpdate] = useState(null)
    const { order, errorOrder, getOrder } = useGetOrder()

    const [showItemDetail, setShowItemDetails] = useState(false)

    const [collectionItem, setCollectionItem] = useState(null)
    const { successOrderDelete, errorOrderDelete, orderDelete } = useDeleteOrder()
    const { updateOrder, errorOrderUpdate, getOrderUpdate } = useUpdateOrderStatus()
    const { orderReport, errorOrderReport, orderReportDetail } = useOrderReport()

    useEffect(
        () => {
            orderReportDetail()
        }, [successOrderDelete, updateOrder]
    )
    const status = ["pending", 'delivered', 'failed']

    const statusClose = useRef()

    useEffect(() => {
        const closeStatus = (e) => {
            if (!statusClose?.current?.contains(e.target)) {
                setShowStatusUpdate(null)
            }
        }
        document.addEventListener("mousedown", closeStatus)
    }, [])

    useEffect(() => {
        getOrder()
    }, [successOrderDelete, updateOrder])

    useEffect(() => {
        if (successOrderDelete) {
            successToast(successOrderDelete)
            setDialogue(false)
            setOrderId(null)
            setPassword(null)
        }
        if (errorOrderDelete) {
            errorToast(errorOrderDelete)
        }
    }, [errorOrderDelete, successOrderDelete])

    useEffect(() => {

        if (updateOrder) {
            successToast(updateOrder)
            setShowStatusUpdate(false)
        }
        if (errorOrderUpdate) {
            errorToast(errorOrderUpdate)
        }

    }, [updateOrder, errorOrderUpdate])


    return (
        <div className="flex min-h-screen">
            <SidePanel />
            <section className="w-full md:w-[85%] max-h-screen overflow-y-auto custom-scroll">
                <AdminInfo />
                <section className='p-2 md:p-4'>
                    <h1 className=' text-xl text-gray-700 font-medium'>Orders</h1>
                    <main className='grid grid-cols-2 md:grid-cols-4 w-full my-4 gap-4 lg:gap-10'>

                        {orderReport?.map((order, index) => (
                            <div key={index} className='flex flex-col gap-1 px-3 py-4 border border-gray-100 rounded-md'>
                                <h1 className='text-[16px] font-normal text-gray-600'>{order.Name}</h1>
                                <h1 className='text-[20px] md:text-2xl font-medium'>{order.Total}</h1>
                            </div>
                        ))}
                    </main>

                    <main className='w-full my-5'>
                        <div className="overflow-x-auto custom-scroll border border-gray-100 rounded-lg h-[500px] overflow-y-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-4 px-8 text-start /70 font-medium">User</th>
                                        <th className="py-4 px-8 text-start /70 font-medium">Address</th>
                                        <th className="py-4 px-8 text-start /70 font-medium">Total Amount</th>
                                        <th className="py-4 px-8 text-start /70 font-medium">Items</th>
                                        <th className="py-4 px-8 text-start /70 font-medium">Date</th>
                                        <th className="py-4 px-8 text-start /70 font-medium">Status</th>
                                        <th className="py-4 px-8 text-start /70 font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order && order.map((item, index) => (
                                        <tr key={index}>
                                            <td className="border-t py-4 px-8 border-gray-100">{`${item.firstName} ${item.lastName}`}</td>
                                            <td className="border-t py-4 px-8 border-gray-100">{item.streetAddress}</td>
                                            <td className="border-t py-4 px-8 border-gray-100">{item.amount}</td>
                                            <td className="border-t py-4 px-8 border-gray-100 cursor-pointer" onClick={() => { setShowItemDetails(!showItemDetail), setCollectionItem(item.foodItems) }}>{item?.foodItems?.length}</td>
                                            <td className="border-t py-4 px-8 border-gray-100">{item.date.split("T")[0]}</td>
                                            <td className="relative border-t py-4 px-8 border-gray-100" >
                                                <h1 className={`py-[4px] px-2 w-fit rounded-lg font-medium cursor-pointer ${item.status.toLowerCase() === "pending" ? "border border-orange-400 text-orange-400" : item.status.toLowerCase() === "delivered" ? "border border-green-500 text-green-500" : "border border-red-500 text-red-500"}`}
                                                    onClick={() =>
                                                        setShowStatusUpdate(index)
                                                    }

                                                >{item.status}</h1>
                                                {showStatusUpdate === index && <div ref={statusClose} className='absolute top-[80%] bg-white shadow-lg z-[10] border border-white rounded-md max-h-[120px]  oveflow-y-auto flex flex-col gap-1 w-[60%]'>
                                                    {status.map((element, index) => (
                                                        <h1 key={index} className='px-3 py-[4px] hover:bg-blue-50' onClick={() => { getOrderUpdate(item._id, element) }}>{element}</h1>

                                                    ))}
                                                </div>}
                                            </td>
                                            <td className="border-t py-4 px-8 border-gray-100">

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
                                                                <div className="flex gap-4 items-center mt-2 pl-3 hover:bg-slate-100 py-1" onClick={(e) => { setOpenPopoverIndex(null) }}>
                                                                    <UserRoundPen color="#172ede" size={18} />
                                                                    <h1>Update Status</h1>
                                                                </div>
                                                                <div className="flex gap-4 items-center pl-3 hover:bg-slate-100 py-1 " onClick={() => { setOpenPopoverIndex(null), setOrderId(item._id), setDialogue(true) }} >
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
                    </main>
                    {dialogue &&

                        <DeleteDialogue
                            dialogue={dialogue}
                            setDialogue={setDialogue}
                            deletefunction={orderDelete}
                            password={password}
                            setPassword={setPassword}
                            id={orderId}
                        />
                    }

                    {showItemDetail && <Dialog.Root onOpenChange={setShowItemDetails} open={showItemDetail}>
                        <Dialog.Trigger asChild>
                            <button className="inline-flex h-[35px] items-center justify-center rounded bg-violet4 px-[15px] font-medium leading-none text-violet11 outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none">
                                {/* Edit profile */}
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/20 data-[state=open]:animate-overlayShow" />
                            <Dialog.Content className="fixed bg-[#FFFF] left-1/2 top-1/2 max-h-[85vh] z-[20] shadow-md  min-w-[350px] w-fit -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1   focus:outline-none data-[state=open]:animate-contentShow">
                                <Dialog.Title >

                                </Dialog.Title>


                                <div className="flex flex-col gap-4 px-[30px] py-4">
                                    <h1 className='text-center font-medium text-base text-gray-700 mb-1'>Food Details</h1>
                                    {collectionItem && collectionItem.map((item, index) => (
                                        <div className='grid grid-cols-7 gap-4 mb-2' key={index}>
                                            <h1 className=''>{`${index + 1}.`}</h1>
                                            <h1 className='col-span-2'>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h1>
                                            <h1 className='col-span-2'>Rs {item.amount}</h1>
                                            <h1 className='col-span-2'>{item.quantity} Qtn</h1>

                                        </div>
                                    ))}
                                </div>

                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>}
                </section>
            </section >
        </div >
    )
}

export default page