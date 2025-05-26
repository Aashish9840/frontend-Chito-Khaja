import { useState } from "react";


const useSearchFood = () => {
    const [searchFood, setSearchFood] = useState(null);
    const [errorSearchFood, setErrorSearchFood] = useState(null);
    const getSearchFood = async (search) => {
        console.log("hit it", search)

        try {
            setSearchFood(null);
            setErrorSearchFood(null);

            const request = await fetch('/api/food/search', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ search: search })

            });
            const update = await request.json();

            if (request.ok) {
                setSearchFood(update.data);
            } else {
                setErrorSearchFood(list.message);
            }
        } catch (error) {
            setErrorSearchFood(error.message);
        }
    };
    return {
        searchFood,
        errorSearchFood,
        getSearchFood
    };
};

export default useSearchFood;
