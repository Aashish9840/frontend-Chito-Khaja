"use client";
import SidePanel from "../../reuseComponents/SidePanel";
import DeleteDialogue from "../../reuseComponents/DeleteDialogue";
import AdminInfo from "../../reuseComponents/AdminInfo";
import * as Dialog from "@radix-ui/react-dialog"
import * as Popover from "@radix-ui/react-popover"
import useGetItemsList from "../../services/admin/useGetItemsList";
import useDeleteItem from "../../services/admin/useDeleteItem";
import useEditFood from "../../services/admin/useEditFood";
import useGetSingleFood from "../../services/admin/useGetSingleFood";
import React, { useEffect, useState } from "react";
import { Ellipsis, EllipsisVertical, EllipsisVerticalIcon, SquarePen, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { errorToast, successToast } from "../../reuseComponents/ReactToast";

const Dashboard = () => {
    const { foodList, loadingList, listError, getFoodList } = useGetItemsList();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const [openPopoverIndex, setOpenPopoverIndex] = useState(null);
    const [dialogue, setDialogue] = useState(false)
    const [editDialogue, setEditDialogue] = useState(false)
    const [foodId, setFoodId] = useState(null)

    const [editInputImage, setEditInputImage] = useState(null)
    const [password, setPassword] = useState(null)
    const { successDelete, loadingDelete, errorDelete, getDeleteFood } = useDeleteItem();

    const { singleFood, errorSingleFood, getSingleFood } = useGetSingleFood()

    const { successEditFood, errorEditFood, editSingleFood } = useEditFood()
    useEffect(() => {
        getFoodList();
    }, [successDelete, successEditFood]);

    useEffect(() => {
        if (singleFood) {
            reset({
                id: singleFood._id,
                name: singleFood.name,
                prize: singleFood.prize,
                description: singleFood.description,
                image: singleFood.image,
                category: singleFood.category
            })
        }

    }, [singleFood])
    useEffect(() => {
        if (successDelete) {
            successToast(successDelete)
            setDialogue(false)
            setPassword(null)
            setFoodId(null)
        }
    }, [successDelete])

    useEffect(() => {
        if (errorDelete) {
            errorToast(errorDelete)
        }
    }, [errorDelete])


    const handleInputImage = (e) => {
        const file = e.target.files[0]
        if (file) {
            setEditInputImage(file)
            setValue("image", file)
        }
    }
    const editFoodForm = (data) => {
        editSingleFood(data)
    }

    useEffect(() => {
        if (successEditFood) {
            successToast(successEditFood)
            setEditInputImage(null)
            setEditDialogue(false)
        }
        if (errorEditFood) {
            errorToast(errorToast)
        }

    }, [successEditFood, errorEditFood])

    return (
        <div className="flex min-h-screen ">
            <SidePanel />
            <div className="w-full md:max-w-[85%] bg-slate-50">
                <AdminInfo />
                <h1 className="tex-2xl px-5 pt-5 font-medium">
                    Food Items list
                </h1>
                <div className="w-full px-7 mt-5">
                    <div className="overflow-auto custom-scroll max-h-[580px]">

                        <table className="w-full">
                            <thead className="bg-green-400">
                                <tr>
                                    <th className="py-4 px-8 text-start text-[#FFF] font-medium">Food Name</th>
                                    <th className="py-4 px-8 text-start text-[#FFF] font-medium">Category</th>
                                    <th className="py-4 px-8 text-start text-[#FFF] font-medium">Prize</th>
                                    <th className="py-4 px-8 text-start text-[#FFF] font-medium">Description</th>
                                    <th className="py-4 px-8 text-start text-[#FFF] font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foodList?.map((food, index) => (
                                    <tr key={index}>
                                        <td className="border-t py-4 px-8 border-gray-100">{food.name}</td>
                                        <td className="border-t py-4 px-8 border-gray-100">{food.category}</td>
                                        <td className="border-t py-4 px-8 border-gray-100">${food.prize}</td>
                                        <td className="border-t py-4 px-8 border-gray-100">{`${food.description.substring(0, 25)}...`}</td>
                                        <td className=" border-t py-4 px-8 border-gray-100 flex items-center justify-start">
                                            <Popover.Root open={openPopoverIndex === index} onOpenChange={(open) => setOpenPopoverIndex(open ? index : null)}>
                                                <Popover.Trigger asChild >
                                                    <button className="cursor-pointer">
                                                        <Ellipsis className="cursor-pointer" />
                                                    </button>
                                                </Popover.Trigger>
                                                <Popover.Portal>
                                                    <Popover.Content
                                                        className="w-[150px] rounded bg-white border-white p-2 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
                                                        sideOffset={5}
                                                    >
                                                        <div className="flex flex-col gap-1 border-none ">
                                                            <div className="flex gap-4 items-center pl-3 hover:bg-slate-100 py-1 " onClick={() => { setOpenPopoverIndex(null), setDialogue(true), setFoodId(food._id) }} >
                                                                <Trash2 color="#e82c2c" size={16} />
                                                                <h1>Delete</h1>
                                                            </div>
                                                            <div className="flex gap-4 items-center mt-2 pl-3 hover:bg-slate-100 py-1" onClick={(e) => { e.preventDefault(), setOpenPopoverIndex(null), getSingleFood(food._id), setEditDialogue(true) }}>
                                                                <SquarePen color="#172ede" size={16} />
                                                                <h1>Edit</h1>
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

                    {editDialogue &&

                        <Dialog.Root onOpenChange={setEditDialogue} open={editDialogue}>
                            <Dialog.Trigger asChild>
                                <button className="inline-flex h-[35px] items-center justify-center rounded bg-violet4 px-[15px] font-medium leading-none text-violet11 outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none">
                                    {/* Edit profile */}
                                </button>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className="fixed inset-0 bg-black/20 data-[state=open]:animate-overlayShow" />
                                <Dialog.Content className="fixed bg-[#FFFF] left-1/2 top-1/2 custom-scroll z-[20] shadow-md w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray1   focus:outline-none data-[state=open]:animate-contentShow">
                                    <Dialog.Title >

                                    </Dialog.Title>


                                    <form onSubmit={handleSubmit(editFoodForm)} className="mt-1 flex flex-col gap-5 w-full p-[20px] h-[75vh] overflow-y-auto custom-scroll">
                                        <h1 className="text-center text-xl text-black font-bold mb-2">Edit Food Item?</h1>


                                        <div className="flex flex-col gap-1">
                                            <label className="font-medium">Name</label>
                                            <input type="text" className="border border-gray-300 outline-none rounded-lg px-2 py-2"
                                                {...register("name")}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="font-medium">Category</label>
                                            <input type="text" className="border border-gray-300 outline-none rounded-lg px-2 py-2"
                                                {...register("category")}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="font-medium">Description</label>
                                            <textarea
                                                maxLength={300}
                                                className="border resize-none border-gray-300 outline-none rounded-lg px-2 py-2"
                                                {...register("description")}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="font-medium">Price</label>
                                            <input type="text" className="border border-gray-300 outline-none rounded-lg px-2 py-2"
                                                {...register("prize")}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="font-medium">Image</label>
                                            <div className="border min-h-[150px] h-fit border-gray-300 rounded-lg px-2 py-2">
                                                <input type="file"
                                                    className="outline-none"
                                                    accept="image/*"
                                                    hidden
                                                    id="newImage"
                                                    onChange={handleInputImage}
                                                />

                                                <h1 className="my-1 text-sm font-medium text-gray-900 cursor-pointer" onClick={() => document.getElementById("newImage").click()}>Another Image</h1>

                                                {editInputImage ? <Image
                                                    src={URL.createObjectURL(editInputImage)}
                                                    height={200}
                                                    width={200}
                                                    alt="image"
                                                    className="h-[150px] w-[150px] rounded-md object-center"
                                                /> : singleFood?.image && (
                                                    <Image
                                                        src={`${process.env.NEXT_PUBLIC_IMAGE}/${singleFood.image}`}
                                                        height={200}
                                                        width={200}
                                                        alt="image"
                                                        className="h-[150px] w-[150px] rounded-md object-center"
                                                    />
                                                )}

                                            </div>



                                        </div>
                                        <div className="flex justify-end items-center gap-5 mr-5">

                                            <Dialog.Close asChild>
                                                <button className="cursor-pointer text-gray-800 font-medium">Close</button>
                                            </Dialog.Close>
                                            <button type="submit" className="px-6 bg-blue-600 hover:bg-blue-500 py-[6px] cursor-pointer rounded-md text-white">
                                                Save
                                            </button>
                                        </div>



                                    </form>

                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>}
                    {dialogue &&

                        <DeleteDialogue
                            dialogue={dialogue}
                            setDialogue={setDialogue}
                            deletefunction={getDeleteFood}
                            password={password}
                            setPassword={setPassword}
                            id={foodId}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard
