"use client"
import React, { useEffect, useState } from 'react'
import Header from '../reuseComponents/Header'
import Footer from '../components/Footer'
import useGetOrderList from '../services/users/useGetOrderList'
import * as Dialog from '@radix-ui/react-dialog'
import OrderHistoryTable from "./components/OrderHistoryTable"
import * as Popover from '@radix-ui/react-popover'
import { Ellipsis } from 'lucide-react'
import { errorToast } from '../reuseComponents/ReactToast'

const page = () => {

    const pdfPath = process.env.NEXT_PUBLIC_ORDER_REPORT

    const [showItemDetail, setShowItemDetails] = useState(false)
    const [collectionItem, setCollectionItem] = useState(null)

    const [showDatePopover, setShowDatePopover] = useState(false)
    const [dateFilter, setDateFilter] = useState({
        fromDate: "",
        toDate: ""
    })

    const { orderDetails, errorOrder, userOrder, latestPdf } = useGetOrderList()

    const filterOrder = () => {

        const date = new Date()
        // convert date string to dateobject
        const toDate = new Date(dateFilter.toDate)
        const fromDate = new Date(dateFilter.fromDate)


        if (!dateFilter.toDate || !dateFilter.fromDate) {
            return errorToast("Filter Date is required")
        }
        if (toDate > date || fromDate > date) {
            return errorToast("Date shouldnot exceed today date")
        }

        userOrder(dateFilter.fromDate, dateFilter.toDate)

    }

    useEffect(() => {
        userOrder()
    }, [])
    return (
        <div>
            <Header />

            <main className=' container w-full my-5'>
                <section className='flex justify-end items-center mb-7 gap-5'>
                    <div className=' cursor-pointer'>
                        <Popover.Root open={showDatePopover} onOpenChange={setShowDatePopover}>
                            <Popover.Trigger asChild >
                                <svg xmlns="http://www.w3.org/2000/svg" className='border-2 border-[#253acd] rounded-md' width="28" height="28" viewBox="0 0 24 24">
                                    <path fill="#253acd" d="M22 18.605a.75.75 0 0 1-.75.75h-5.1a2.93 2.93 0 0 1-5.66 0H2.75a.75.75 0 1 1 0-1.5h7.74a2.93 2.93 0 0 1 5.66 0h5.1a.75.75 0 0 1 .75.75m0-13.21a.75.75 0 0 1-.75.75H18.8a2.93 2.93 0 0 1-5.66 0H2.75a.75.75 0 1 1 0-1.5h10.39a2.93 2.93 0 0 1 5.66 0h2.45a.74.74 0 0 1 .75.75m0 6.6a.74.74 0 0 1-.75.75H9.55a2.93 2.93 0 0 1-5.66 0H2.75a.75.75 0 1 1 0-1.5h1.14a2.93 2.93 0 0 1 5.66 0h11.7a.75.75 0 0 1 .75.75" />
                                </svg>
                            </Popover.Trigger>
                            <Popover.Portal>
                                <Popover.Content
                                    className="w-fit relative right-10 rounded bg-white border-white p-2 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
                                    sideOffset={5}
                                >
                                    <div className="flex flex-col gap-4 border-none p-3">
                                        <h1 className='text-center font-medium font-dm_sans text-xl'>Refine Results</h1>
                                        <section className='flex gap-5 items-center'>
                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor="">Start Date</label>
                                                <input type="date" className=' px-2 py-1 outline-none border-2 rounded-md border-gray-500' placeholder='Start Date'
                                                    onChange={(e) => setDateFilter(prev => ({ ...prev, fromDate: e.target.value }))}
                                                />

                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor="">End Date</label>
                                                <input type="date" className='px-2 py-1 outline-none border-2 rounded-md border-gray-500' placeholder='End Date'
                                                    onChange={(e) => setDateFilter(prev => ({ ...prev, toDate: e.target.value }))}
                                                />
                                            </div>
                                        </section>
                                        <div className='flex gap-2 items-center justify-end mt-5'>


                                            <button className='text-lg font-medium text-gray-700' onClick={() => filterOrder()}>
                                                Apply
                                            </button>

                                            <Popover.Close

                                                aria-label="Close"
                                                className='border rounded-md px-5 py-1 bg-blue-700 text-white hover:bg-blue-600'
                                            >
                                                Close


                                            </Popover.Close>
                                        </div>


                                    </div>

                                </Popover.Content>
                            </Popover.Portal>
                        </Popover.Root>
                    </div>
                    <div>
                        <a href={latestPdf ? `${pdfPath}/${latestPdf}` : "#"} target={latestPdf ? "_blank" : "_self"} className='px-2 py-1 border-2 rounded-md flex gap-1 items-center text-base font-medium hover:border-black/60'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04l.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66c.03-.2-.02-.39-.12-.55c-.29-.47-1.04-.69-2.28-.69l-1.29.07l-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77c-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8l-.89.49c-1.2.75-1.77 1.59-1.88 2.12c-.04.19-.02.36.05.54l.03.05l.48.31l.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75c1.03.51 2.24.74 3 .74c.44 0 .74-.11.91-.3m-.41-.71l.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51c.09-.1.13-.1.23-.1c1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2c.05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12l.15.05c.17.24.19.56.09 1.1l-.03.16l-.16.82z" />
                        </svg>
                            download
                        </a>
                    </div>
                </section>
                <section className="overflow-x-auto custom-scroll  h-fit max-h-[600px] overflow-y-auto">
                    <OrderHistoryTable orderDetails={orderDetails} />
                </section>
                {showItemDetail && <Dialog.Root onOpenChange={setShowItemDetails} open={showItemDetail}>
                    <Dialog.Trigger asChild>
                        <button className="inline-flex h-[35px] items-center justify-center rounded bg-violet4 px-[15px] font-medium leading-none text-violet11 outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none">
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