import React from 'react'

const Loader = () => {
    return (
        <div className='flex gap-2 '>
            <h1 className='text-2xl font-semibold font-dm_sans'>Loading</h1>
            <div className='flex items-center gap-3'>
                <div className='bg-blue-700 p-[4px] border rounded-full loader' style={{ animationDelay: "0s" }}>
                </div>
                <div className='bg-blue-700 p-[4px] border rounded-full loader' style={{ animationDelay: "0.4s" }}>
                </div>
                <div className='bg-blue-700 p-[4px] border rounded-full loader' style={{ animationDelay: "0.8s" }}>
                </div>
                <div className='bg-blue-700 p-[4px] border rounded-full loader' style={{ animationDelay: "1.2s" }}>
                </div>

            </div>
        </div>

    )
}

export default Loader