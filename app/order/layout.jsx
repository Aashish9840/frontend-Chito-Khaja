import React from 'react'
import UserProtectedRoute from '../reuseComponents/UserProtectedRoute';
export const metadata = {
    metadataBase: new URL("https://foodDelivery.com/dashboard/"),
    title: "Chito Khaja-Cart",
    keywords: "",
    description:
        "Give your Brand a Pro Look With OX APP Suite in Nepal. Own a Professional Email of your Business Domain Today! From Affordable OX APP Suite Plans.",

    openGraph: {
        title: "Cart - Chito Khaja",
        description:
            "Access Admin Dashboard to manage and handle the growing requirement of instant food delivery",
        images: "",

        url: "Admin",
    },
};

const layout = ({ children }) => {
    return (
        <div>
            <UserProtectedRoute>
                {children}
            </UserProtectedRoute>
        </div>
    )
}

export default layout