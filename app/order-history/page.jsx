"use client"
import React, { useEffect, useState } from 'react'
import Header from '../reuseComponents/Header'
import Footer from '../components/Footer'
import useGetOrderList from '../services/users/useGetOrderList'
import * as Dialog from '@radix-ui/react-dialog'

const page = () => {

    const [showItemDetail, setShowItemDetails] = useState(false)

    const [collectionItem, setCollectionItem] = useState(null)
    const { orderDetails, errorOrder, userOrder } = useGetOrderList()
    useEffect(() => {
        userOrder()
    }, [])
    console.log(
        orderDetails
    )
    return (
        <div>
            <Header />
            <main className=' container w-full my-5'>
                <div className="overflow-x-auto custom-scroll  h-fit max-h-[600px] overflow-y-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-4 px-8 text-start /70 font-medium">Name</th>
                                <th className="py-4 px-8 text-start /70 font-medium">Address</th>
                                <th className="py-4 px-8 text-start /70 font-medium">Items</th>
                                <th className="py-4 px-8 text-start /70 font-medium">Total Amount</th>
                                <th className="py-4 px-8 text-start /70 font-medium">Date</th>
                                <th className="py-4 px-8 text-start /70 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails


                                && orderDetails.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border-t py-4 px-8 border-gray-100">{`${item.firstName} ${item.lastName}`}</td>
                                        <td className="border-t py-4 px-8 border-gray-100">{item.streetAddress}</td>
                                        <td className="border-t py-4 px-8 border-gray-100 cursor-pointer" onClick={() => { setShowItemDetails(!showItemDetail), setCollectionItem(item.foodItems) }}>{item?.foodItems?.length}</td>
                                        <td className="border-t py-4 px-8 border-gray-100">{item.amount}</td>
                                        <td className="border-t py-4 px-8 border-gray-100">{item.date.split("T")[0]}</td>
                                        <td className="relative border-t py-4 px-8 border-gray-100" >
                                            <h1 className={`py-[4px] px-2 w-fit rounded-lg font-medium cursor-pointer ${item.status.toLowerCase() === "pending" ? "border border-orange-400 text-orange-400" : item.status.toLowerCase() === "delivered" ? "border border-green-500 text-green-500" : "border border-red-500 text-red-500"}`}
                                            // onClick={() =>
                                            //     setShowStatusUpdate(index)
                                            // }

                                            >{item.status}</h1>
                                            {/* {showStatusUpdate === index && <div ref={statusClose} className='absolute top-[80%] bg-white shadow-lg z-[10] border border-white rounded-md max-h-[120px]  oveflow-y-auto flex flex-col gap-1 w-[60%]'>
                                                {status.map((element, index) => (
                                                    <h1 key={index} className='px-3 py-[4px] hover:bg-blue-50' onClick={() => { getOrderUpdate(item._id, element) }}>{element}</h1>

                                                ))}
                                            </div>} */}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
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
                                    <div className='grid grid-cols-9 gap-4 mb-2' key={index}>
                                        <h1 className=''>{`${index + 1}.`}</h1>
                                        <h1 className='col-span-4'>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h1>
                                        <h1 className='col-span-2'>Rs {item.prize}</h1>
                                        <h1 className='col-span-2'>{item.quantity} Qtn</h1>

                                    </div>
                                ))}
                            </div>

                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>}
            </main>
            <Footer />
        </div>
    )
}

export default page