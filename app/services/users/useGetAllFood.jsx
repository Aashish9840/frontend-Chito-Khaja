import { CloudDrizzle } from "lucide-react";
import { useState } from "react";


const useGetAllFood = () => {
    const imagePath = process.env.NEXT_PUBLIC_IMAGE

    const [successFoodList, setSuccessFoodList] = useState(null);
    const [errorFood, setErrorFood] = useState(null);
    const getAllFood = async () => {

        try {
            setSuccessFoodList(null);
            setErrorFood(null);

            const request = await fetch(`/api/food/list`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                }

            });
            const update = await request.json();

            if (request.ok) {
                setSuccessFoodList(update.data);
            } else {
                setErrorFood(list.message);
            }
        } catch (error) {
            setErrorFood(error.message);
        }
    };
    return {
        successFoodList,
        errorFood,
        getAllFood
    };
};

export default useGetAllFood;
