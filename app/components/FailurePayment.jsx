import { Ban, Calendar, Check, CreditCard, Hash, Package, User, X } from 'lucide-react'
import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
const FailurePayment = ({ showPaymentDialogue, setShowPaymentDialogue }) => {
    return (

        <Dialog.Root onOpenChange={setShowPaymentDialogue} open={showPaymentDialogue}>
            <Dialog.Trigger asChild>
                <button className="inline-flex h-[35px] items-center justify-center rounded bg-violet4 px-[15px] font-medium leading-none text-violet11 outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none">
                    {/* Edit profile */}
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/20 data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed z-[100] bg-white border border-destructive/20 rounded-lg shadow-lg left-1/2 top-1/2 custom-scrollz-[50] max-h-[70vh] h-fit w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 bg-gray1   focus:outline-none data-[state=open]:animate-contentShow">
                    <Dialog.Title >

                    </Dialog.Title>

                    <div className="relative max-w-md mx-auto p-6 animate-in fade-in-50 slide-in-from-top-5 duration-300">
                        {/* Close button */}

                        <button
                            onClick={() => setShowPaymentDialogue(prev => ({ ...prev, showSuccess: false, showFail: false }))}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors duration-200 p-1 rounded-full hover:bg-destructive/10"
                        >
                            <X size={20} />
                        </button>


                        {/* Content */}
                        <div className="flex flex-col items-center text-center space-y-4">
                            {/* Failure Icon */}
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <Ban className="w-8 h-8 text-red-500" />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-foreground">
                                Payment Failed
                            </h3>

                            {/* Message */}
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Your payment could not be processed. Please check your card details and try again.
                            </p>

                            {/* Action Button */}
                            <button className="w-full bg-black/80 text-white px-4 py-2 rounded-md font-medium hover:bg-black/90 transition-colors duration-200">
                                Try Again
                            </button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    )
}

export default FailurePayment