import { useState } from "react";


const getCategoryFood = () => {
    const [categoryFood, setCategoryFood] = useState(null);
    const [errorCategory, setErrorCategory] = useState(null);
    const useFoodCategory = async () => {

        try {
            setCategoryFood(null);
            setErrorCategory(null);
            const request = await fetch("/api/food/categoryFood", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const list = await request.json();
            if (request.ok) {
                setCategoryFood(list.data);
            } else {
                setErrorCategory(list.message);
            }
        } catch (error) {
            setErrorCategory(error.message);
        }

    };

    return {
        categoryFood,
        errorCategory,
        useFoodCategory
    };
};

export default getCategoryFood;
