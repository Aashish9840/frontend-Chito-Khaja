import { CloudDrizzle } from "lucide-react";
import { useState } from "react";


const useGetAllFood = () => {
    const [successFoodList, setSuccessFoodList] = useState(null);
    const [errorFood, setErrorFood] = useState(null);
    const getAllFood = async (category) => {

        try {
            setSuccessFoodList(null);
            setErrorFood(null);

            const baseUrl = new URL('/api/food/list', window.location.origin)
            if (category) {
                baseUrl.searchParams.append("category", category)
            }


            const request = await fetch(baseUrl.toString(), {
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
