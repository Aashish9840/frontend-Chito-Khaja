"use client"
import React, { useState } from 'react'
import SidePanel from '../../../reuseComponents/SidePanel'
import AdminInfo from '../../../reuseComponents/AdminInfo'
import ResetPassword from "./components/ResetPassword"
import General from './components/General'
import Help from './components/Help'


const page = () => {
    const settingList = ["General", "Security", "Order Notification", "Help"]
    const [showList, setShowList] = useState("General")


    return (
        <div className="flex min-h-screen">
            <SidePanel />
            <section className="w-full md:w-[85%] bg-slate-50 max-h-[screen] h-[90vh]">
                <AdminInfo />
                <div className='flex flex-col mb-6 px-3 md:flex-row w-full h-full gap-3'>
                    <section className='w-full sm:w-[20vw] border-r flex flex-row md:flex-col gap-5 border-r-gray-300 p-1 sm:p-3 md:p-8'>
                        {settingList.map((list, index) => (
                            <h1 key={index} className={`py-2 ${showList === list ? "bg-gray-300 text-blue-700" : ""} hover:bg-gray-300 hover:text-blue-700 font-medium px-2 sm:px-4 text-[14px] sm:text-sm rounded-lg`} onClick={() => setShowList(list)}>{list}</h1>
                        ))}
                    </section>
                    <div className='w-full md:p-8'>
                        {showList === "General" &&
                            <General />
                        }

                        {

                            showList === "Security" && <ResetPassword />
                        }
                        {

                            showList === "Help" && <Help />
                        }

                    </div>


                </div>

            </section>
        </div>
    )
}

export default page