import { useState } from "react";


const useGetItemsList = () => {
    const [foodList, setFoodList] = useState(null);
    const [listError, setListError] = useState(null);
    const [loadingList, setLoadingError] = useState(false);
    const getFoodList = async () => {

        try {
            setFoodList(null);
            setLoadingError(false);
            setListError(null);
            const request = await fetch("/api/food/list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const list = await request.json();
            if (request.ok) {
                setFoodList(list.data);
            } else {
                setListError(list.message);
            }
        } catch (error) {
            setListError(error.message);
        }
        finally {
            setLoadingError(true)
        }
    };

    return {
        foodList,
        loadingList,
        listError,
        getFoodList
    };
};

export default useGetItemsList;
