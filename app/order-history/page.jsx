"use client"
import React, { useEffect, useState } from 'react'
import Header from '../reuseComponents/Header'
import Footer from '../components/Footer'
import useGetOrderList from '../services/users/useGetOrderList'
import * as Dialog from '@radix-ui/react-dialog'

const page = () => {

    const pdfPath = process.env.NEXT_PUBLIC_ORDER_REPORT

    const [showItemDetail, setShowItemDetails] = useState(false)

    const [collectionItem, setCollectionItem] = useState(null)
    const { orderDetails, errorOrder, userOrder, latestPdf } = useGetOrderList()

    console.log(pdfPath, latestPdf)
    useEffect(() => {
        userOrder()
    }, [])
    return (
        <div>
            <Header />

            <main className=' container w-full my-5'>
                <div className='flex justify-end items-center mb-7'>
                    <a href={`${pdfPath}/${latestPdf}`} target="_blank" className='px-2 py-1 border-2 rounded-md flex gap-1 items-center text-base font-medium hover:border-black/60'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04l.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66c.03-.2-.02-.39-.12-.55c-.29-.47-1.04-.69-2.28-.69l-1.29.07l-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77c-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8l-.89.49c-1.2.75-1.77 1.59-1.88 2.12c-.04.19-.02.36.05.54l.03.05l.48.31l.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75c1.03.51 2.24.74 3 .74c.44 0 .74-.11.91-.3m-.41-.71l.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51c.09-.1.13-.1.23-.1c1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2c.05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12l.15.05c.17.24.19.56.09 1.1l-.03.16l-.16.82z" />
                    </svg>
                        download
                    </a>


                </div>
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