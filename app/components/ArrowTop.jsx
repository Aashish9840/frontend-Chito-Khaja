'use client'
import React, { useEffect, useState } from 'react'

const ArrowTop = () => {
    const [showArrow, setShowArrow] = useState(false)
    useEffect(() => {
        const scrollDown = () => {
            if (window.scrollY > 500) {
                setShowArrow(true)
            }
            else {
                setShowArrow(false)
            }
        }
        scrollDown()
        window.addEventListener('scroll', scrollDown)
    }, [])

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }
    return (

        <>

            <div className={`
                    fixed bottom-10 right-10 z-[10] cursor-pointer
                    rounded-full bg-black/80 p-2 shadow-md
                    transition-all duration-700 ease-in-out
        ${showArrow ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[100px] '}
      `}
                onClick={() => handleScrollTop()}>

                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="#fff" d="M10.94 7.94a1.5 1.5 0 0 1 2.12 0l5.658 5.656a1.5 1.5 0 1 1-2.122 2.121L12 11.122l-4.596 4.596a1.5 1.5 0 1 1-2.122-2.12z" /></g></svg>

            </div>

        </>




    )
}

export default ArrowTop