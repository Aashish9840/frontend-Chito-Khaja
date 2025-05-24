import React from 'react'
import * as Dialog from "@radix-ui/react-dialog"
const DeleteDialogue = ({ dialogue, setDialogue, deletefunction, id, password, setPassword }) => {
    return (
        <Dialog.Root onOpenChange={setDialogue} open={dialogue}>
            <Dialog.Trigger asChild>
                <button className="inline-flex h-[35px] items-center justify-center rounded bg-violet4 px-[15px] font-medium leading-none text-violet11 outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none">
                    {/* Edit profile */}
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/20 data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed bg-[#FFFF] left-1/2 top-1/2 max-h-[85vh] z-[20] shadow-md w-[90vw] max-w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1   focus:outline-none data-[state=open]:animate-contentShow">
                    <Dialog.Title >

                    </Dialog.Title>


                    <div className="mt-1 flex flex-col w-full p-[20px]">
                        <h1 className="text-center text-[18px] font-medium">Delete</h1>
                        <h1 className="px-[20px] text-center text-[14px] px- text-gray-400">Are you sure to delete from the database?</h1>
                        <div className="py-4">

                            <input type="text" className="border-gray-300 rounded-md outline-none border px-3  rounde-md w-full py-2 mt-1" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="px-2 py-2 tex-center w-full bg-blue-600 rounded-md text-[#FFFF] hover:bg-blue-500" onClick={() => { deletefunction(id, password) }} >Confirm</button>

                    </div>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default DeleteDialogue