import React from 'react'

const OrderHistoryTable = ({ orderDetails }) => {


    return (
        <div>
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
                    {orderDetails?.length > 0


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
            <section>
                {orderDetails?.length <= 0 &&

                    <h1 className='text-gray-500 text-center py-10 font-dm_sans text-lg'>
                        No orders found for the selected date range.
                    </h1>



                }
            </section>
        </div>

    )
}

export default OrderHistoryTable