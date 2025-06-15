'use client'
import React from 'react'
import FAQ from '../../../../reuseComponents/FAQ'
const Help = () => {
    const chitoKhajaFAQs = [
        {
            title: "What is Chito Khaja?",
            description: "Chito Khaja is a fast and reliable online food delivery platform in Nepal, offering a wide variety of local and international dishes from nearby restaurants delivered straight to your doorstep."
        },
        {
            title: "How do I place an order on Chito Khaja?",
            description: "To place an order, simply browse the available restaurants, select your desired food items, add them to your cart, and proceed to checkout. You can choose to pay online or opt for cash on delivery."
        },
        {
            title: "Is there a delivery charge?",
            description: "Delivery charges may vary based on distance, order amount, and restaurant policy. However, many restaurants offer free delivery on orders above a certain amount."
        },
        {
            title: "How can I track my order?",
            description: "Once your order is placed, you can track its status in real-time from the 'My Orders' section. We notify you when the restaurant starts preparing your food and when it’s out for delivery."
        },
        {
            title: "What if I receive the wrong or a damaged item?",
            description: "In case of any issues with your order, such as wrong or damaged items, you can contact our support team immediately through the app or website. We’ll investigate and resolve the issue quickly."
        },
        {
            title: "Can I schedule an order for later delivery?",
            description: "Yes, Chito Khaja allows you to schedule your orders in advance. Just select the ‘Schedule’ option at checkout and choose your preferred delivery time."
        }
    ];
    return (
        <div className=''>

            <h1 className='text-2xl font-inter font-semibold'>Learn More About Chito Khaja</h1>
            <section className='my-10'>
                <FAQ QA={chitoKhajaFAQs} />
            </section>
        </div>
    )
}


export default Help