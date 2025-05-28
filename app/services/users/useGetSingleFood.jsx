import { useState } from "react";


const useGetSingleFood = () => {
    const [singleFood, setSingleFood] = useState(null);
    const [errorSingleFood, setErrorSingleFood] = useState(null);
    const getSingleFood = async (foodId) => {
        console.log(foodId, "id")
        try {

            const request = await fetch("/api/food/single", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ foodId })

            });
            const update = await request.json();

            if (request.ok) {
                setSingleFood(update.data);
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
