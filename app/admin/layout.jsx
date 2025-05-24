import React from 'react'
import ProtectedRoute from "../reuseComponents/ProtectedRoute"

export const metadata = {
    metadataBase: new URL("https://foodDelivery.com/dashboard/"),
    title: "Food Delivery - Admin",
    keywords: "",
    description:
        "Give your Brand a Pro Look With OX APP Suite in Nepal. Own a Professional Email of your Business Domain Today! From Affordable OX APP Suite Plans.",

    openGraph: {
        title: "Admin - Food Delivery",
        description:
            "Access Admin Dashboard to manage and handle the growing requirement of instant food delivery",
        images: "",

        url: "Admin",
    },
};

const layout = ({ children }) => {
    return (
        <div>
            <ProtectedRoute>
                {children}
            </ProtectedRoute>
        </div>
    )
}

export default layout