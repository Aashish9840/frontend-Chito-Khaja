import { Calendar, CalendarDays, Check, CreditCard, Hash, MapPin, Package, User, X } from 'lucide-react'
import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
const PaymentSuccess = ({ successPayment, showPaymentDialogue, setShowPaymentDialogue }) => {
    console.log(successPayment)
    return (

        <Dialog.Root onOpenChange={setShowPaymentDialogue} open={showPaymentDialogue}>
            <Dialog.Trigger asChild>
                <button className="inline-flex h-[35px] items-center justify-center rounded bg-violet4 px-[15px] font-medium leading-none text-violet11 outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none">
                    {/* Edit profile */}
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/20 data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed bg-[#FFFF] shadow-lg left-1/2 top-1/2 custom-scroll rounded-lg z-[50] h-[75vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 bg-gray1   focus:outline-none data-[state=open]:animate-contentShow">
                    <Dialog.Title >

                    </Dialog.Title>

                    <div className=" h-full w-full mx-auto overflow-hidden animate-scale-in">
                        {/* Success Header with Icon */}
                        <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 px-2 py-3 text-center border-b border-border">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-2 shadow-lg">
                                <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Payment Complete</h2>
                            <p className="text-muted-foreground">Thank you for your purchase</p>

                            {/* close dialgoue */}
                            <div className='absolute right-4 top-[3px] flex justify-center items-center p-1 cursor-pointer' onClick={() => setShowPaymentDialogue(prev => ({ ...prev, showSuccess: false, showFail: false }))}>
                                <X size={26} />
                            </div>
                        </div>
                        {/* Card Content */}
                        <div className="px-6 py-2 space-y-2">
                            {/* Amount Display */}


                            {/* Payment Details Grid */}
                            <div className="">
                                {/* Customer */}
                                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <User className="w-6 h-6 text-black/80" />
                                        </div>
                                        <span className="text-muted-foreground font-medium">Customer</span>
                                    </div>
                                    <span className="font-medium text-foreground">{`${successPayment?.firstName} ${successPayment?.lastName}`}</span>
                                </div>

                                {/* Payment Method */}
                                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <CreditCard className="w-6 h-6 text-black/80" />
                                        </div>
                                        <span className="text-muted-foreground font-medium">Payment</span>
                                    </div>
                                    <span className="font-medium text-foreground">esewa</span>
                                </div>

                                {/* Items */}
                                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <Package className="w-6 h-6 text-black/80" />
                                        </div>
                                        <span className="text-muted-foreground font-medium">Items</span>
                                    </div>
                                    <span className="font-medium text-foreground">{successPayment?.foodItems?.length} items</span>
                                </div>

                                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-black/80" />
                                        </div>
                                        <span className="text-muted-foreground font-medium">Address</span>
                                    </div>
                                    <span className="font-medium text-foreground">{successPayment?.streetAddress}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <CalendarDays className="w-6 h-6 text-black/80" />
                                        </div>
                                        <span className="text-muted-foreground font-medium">Date</span>
                                    </div>
                                    <span className="font-medium text-foreground">{successPayment?.date?.split("T")[0]}</span>
                                </div>
                            </div>

                            <div className="border-t border-border pt-2 space-y-3 px-6">
                                <div className="flex items-center justify-between">

                                    <span className="text-base font-bold text-muted-foreground">Total Amount</span>

                                    <span className="text-base font-bold text-foreground">{successPayment?.amount}</span>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="flex justify-center pt-2">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-200">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium">Successfully Processed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    )
}

export default PaymentSuccess