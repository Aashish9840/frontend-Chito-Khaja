import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className=' p-0 mt-10 md:p-6 container'>
            <section className='flex justify-between gap-2 items-center border-b-2 border-b-gray-400 pb-10'>
                <div className='flex items-center'>
                    <Image
                        src="/admin/food_logo.jpg"
                        width={200}
                        height={200}
                        alt='logo'
                        className='h-[50px] w-[50px]'

                    />
                    <h1 className='text-[16px] md:text-2xl font-dm_sans text-black/90 font-bold'>Chito Khaja</h1>
                </div>
                <h1 className='text-[14px] cursor-pointer md:text-base font-liber font-medium text-black/80 '>Chito Khaja represents flavorful Nepali snacks with cultural hospitality.</h1>

            </section>
            <section className='mt-10 flex flex-col justify-between lg:flex-row items-center border-b-2 border-b-gray-400 pb-20'>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 w-full lg:w-[40%]'>
                    <main className='flex gap-2 flex-col'>
                        <h1 className='text-xl font-semibold font-commissioner text-black/90 leading-6 mb-3'>Services</h1>
                        <Link href='/category' className='text-[14px] cursor-pointer  font-dm_sans font-medium text-black/95'>Category Food</Link>
                        <Link href='/order' className='text-[14px] cursor-pointer  font-dm_sans font-medium text-black/95'>Order Details</Link>
                        <Link href='/popular' className='text-[14px] cursor-pointer  font-dm_sans font-medium text-black/95'>Popular Dishes</Link>

                    </main>
                    <main className='flex gap-2 flex-col'>
                        <h1 className='text-xl font-semibold font-commissioner text-black/90 leading-6 mb-3'>Support</h1>
                        <h2 className='text-[14px] cursor-pointer  font-dm_sans font-medium text-black/95'>Special Offers</h2>
                        <h2 className='text-[14px] cursor-pointer  font-dm_sans font-medium text-black/95'>Order History</h2>
                        <h2 className='text-[14px] cursor-pointer  font-dm_sans font-medium text-black/95'>Track Order</h2>
                    </main>
                    <main className='flex gap-2 flex-col'>
                        <h1 className='text-xl font-semibold font-commissioner text-black/90 leading-6 mb-3 '>Contact</h1>
                        <div className='flex gap-2 items-center'>
                            <div className='rounded-xl p-1 border border-gray-200 cursor-pointer'>

                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none"><path fill="#60dcf0" d="M3 5v-.75a.75.75 0 0 0-.75.75zm18 0h.75a.75.75 0 0 0-.75-.75zM3 5.75h18v-1.5H3zM20.25 5v12h1.5V5zM19 18.25H5v1.5h14zM3.75 17V5h-1.5v12zM5 18.25c-.69 0-1.25-.56-1.25-1.25h-1.5A2.75 2.75 0 0 0 5 19.75zM20.25 17c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0 0 21.75 17z" /><path stroke="#60dcf0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m3 5l9 9l9-9" /></g></svg>
                            </div>
                            <h2 className='text-[14px]  font-dm_sans font-medium text-black/95'>shahaashih@gmail.com</h2>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className='rounded-xl p-1 border border-gray-200 cursor-pointer'>

                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#40dff8" d="M19.5 22a1.5 1.5 0 0 0 1.5-1.5V17a1.5 1.5 0 0 0-1.5-1.5c-1.17 0-2.32-.18-3.42-.55a1.51 1.51 0 0 0-1.52.37l-1.44 1.44a14.77 14.77 0 0 1-5.89-5.89l1.43-1.43c.41-.39.56-.97.38-1.53c-.36-1.09-.54-2.24-.54-3.41A1.5 1.5 0 0 0 7 3H3.5A1.5 1.5 0 0 0 2 4.5C2 14.15 9.85 22 19.5 22M3.5 4H7a.5.5 0 0 1 .5.5c0 1.28.2 2.53.59 3.72c.05.14.04.34-.12.5L6 10.68c1.65 3.23 4.07 5.65 7.31 7.32l1.95-1.97c.14-.14.33-.18.51-.13c1.2.4 2.45.6 3.73.6a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 1-.5.5C10.4 21 3 13.6 3 4.5a.5.5 0 0 1 .5-.5" /></svg>
                            </div>
                            <h2 className='text-[14px]  font-dm_sans font-medium text-black/95'>9840733064</h2>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className='rounded-xl p-1 border border-gray-200 cursor-pointer'>

                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="#40dff8" d="M12 2a9 9 0 0 1 9 9c0 3.074-1.676 5.59-3.442 7.395a20.4 20.4 0 0 1-2.876 2.416l-.426.29l-.2.133l-.377.24l-.336.205l-.416.242a1.87 1.87 0 0 1-1.854 0l-.416-.242l-.52-.32l-.192-.125l-.41-.273a20.6 20.6 0 0 1-3.093-2.566C4.676 16.589 3 14.074 3 11a9 9 0 0 1 9-9m0 2a7 7 0 0 0-7 7c0 2.322 1.272 4.36 2.871 5.996a18 18 0 0 0 2.222 1.91l.458.326q.222.155.427.288l.39.25l.343.209l.289.169l.455-.269l.367-.23q.293-.186.627-.417l.458-.326a18 18 0 0 0 2.222-1.91C17.728 15.361 19 13.322 19 11a7 7 0 0 0-7-7m0 3a4 4 0 1 1 0 8a4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4" /></g></svg>
                            </div>
                            <h2 className='text-[14px]  font-dm_sans font-medium text-black/95'>kamabinayak, Bhaktapur</h2>
                        </div>

                    </main>
                </div>
                <div className='py-4'>

                    <h1 className='text-xl font-semibold font-commissioner text-bl[14px]90 text-center  text-black/95 leading-6 mb-3'>Social Links</h1>
                    <div className='flex gap-4 items-center pt-4'>
                        <Link href="https://www.facebook.com/aashishbabu.shah" className='border-2 border-gray-200 cursor-pointer p-1 rounded-xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1M12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6m-5 3a5 5 0 1 1 10 0a5 5 0 0 1-10 0" clipRule="evenodd" /></svg>
                        </Link>
                        <Link href='https://www.facebook.com/aashishbabu.shah' className='border-2 border-gray-200 cursor-pointer p-1 rounded-xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M20.9 2H3.1A1.1 1.1 0 0 0 2 3.1v17.8A1.1 1.1 0 0 0 3.1 22h9.58v-7.75h-2.6v-3h2.6V9a3.64 3.64 0 0 1 3.88-4a20 20 0 0 1 2.33.12v2.7H17.3c-1.26 0-1.5.6-1.5 1.47v1.93h3l-.39 3H15.8V22h5.1a1.1 1.1 0 0 0 1.1-1.1V3.1A1.1 1.1 0 0 0 20.9 2" /></svg>
                        </Link>
                        <Link href='https://www.linkedin.com/in/aashishbabu-shah-3681a7216/' className='border-2 border-gray-200 cursor-pointer p-1 rounded-xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="#000" d="M18 3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zM8 10a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-5a1 1 0 0 0-1-1m3-1a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-3.66c.245-.344.82-.748 1.393-.993c.333-.142.834-.2 1.182-.09a.55.55 0 0 1 .293.188c.052.07.132.226.132.555v4a1 1 0 0 0 2 0v-4c0-.67-.17-1.266-.524-1.744a2.54 2.54 0 0 0-1.241-.907c-.902-.283-1.901-.126-2.568.16a6 6 0 0 0-.623.312A1 1 0 0 0 11 9M8 7a1 1 0 1 0 0 2a1 1 0 0 0 0-2" /></g></svg>
                        </Link>
                        <Link href='https://github.com/Aashish9840' className='border-2 border-gray-200 cursor-pointer p-1 rounded-xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M12 2.249c-5.484 0-10 4.452-10 10c0 4.387 2.871 8.13 6.871 9.484c.516.097.677-.226.677-.452s0-.87-.032-1.742c-2.774.645-3.355-1.355-3.355-1.355c-.451-1.129-1.129-1.451-1.129-1.451c-.903-.645.033-.645.033-.645c1 .032 1.548 1.032 1.548 1.032c.87 1.548 2.355 1.097 2.903.806c.097-.645.355-1.096.645-1.354c-2.193-.226-4.548-1.097-4.548-4.904c0-1.096.42-1.967 1.032-2.645c-.097-.226-.451-1.258.097-2.645c0 0 .87-.258 2.774 1.032a9.3 9.3 0 0 1 2.516-.355c.871 0 1.742.097 2.516.355c1.904-1.258 2.742-1.032 2.742-1.032c.549 1.355.226 2.42.097 2.645c.645.678 1.032 1.58 1.032 2.645c0 3.807-2.355 4.678-4.548 4.904c.355.322.677.967.677 1.87c0 1.355-.032 2.42-.032 2.742c0 .259.194.549.678.452C19.129 20.314 22 16.604 22 12.185c-.032-5.484-4.516-9.936-10-9.936" /></svg>
                        </Link>

                    </div>

                </div>

            </section>

            <section className='flex justify-between items-center gap-10 my-4'>
                <h1 className='text-[14px] cursor-pointer font-dm_sans font-medium text-black/70'>© 2025 Chito Khaja. All rights reserved. Crafted with love, simplicity, and Nepali tradition.</h1>
                <div className='flex items-center gap-8'>
                    <h1 className='text-[14px] cursor-pointer font-dm_sans font-medium text-black/70'>Terms and Condition</h1>
                    <h1 className='text-[14px] cursor-pointer font-dm_sans font-medium text-black/70'>Policies</h1>
                    <h1 className='text-[14px] cursor-pointer font-dm_sans font-medium text-black/70'>Cookies</h1>

                </div>

            </section>

        </div>
    )
}

export default Footer