import { useState } from "react";


const useGetSingleFood = () => {
    const [singleFood, setSingleFood] = useState(null);
    const [errorSingleFood, setErrorSingleFood] = useState(null);
    const getSingleFood = async (foodId) => {

        try {
            setSingleFood(null);
            setErrorSingleFood(null);
            const request = await fetch(`/api/food/single`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ foodId: foodId })
            });

            const list = await request.json();
            if (request.ok) {
                setSingleFood(list.data);
            } else {
                setErrorSingleFood(list.message);
            }
        } catch (error) {
            setErrorSingleFood(error.message);
        }

    };
    return {
        singleFood,
        errorSingleFood,
        getSingleFood
    };
};

export default useGetSingleFood;
