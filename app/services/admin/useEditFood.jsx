import { useState } from "react";


const useEditFood = () => {
    const [successEditFood, setSuccessFood] = useState(null);
    const [errorEditFood, setErrorEditFood] = useState(null);
    const editSingleFood = async (form) => {

        try {

            const formdetails = new FormData()

            const keys = Object.keys(form)

            keys.forEach((key) => {

                if (form[key] !== "" && form[key] !== undefined && form[key] !== null) {
                    formdetails.append(key, form[key])

                }

            })
            setSuccessFood(null);
            setErrorEditFood(null);
            const request = await fetch(`/api/food/update`, {
                method: "PUT",
                body: formdetails
            });

            const list = await request.json();
            if (request.ok) {
                setSuccessFood(list.message);
            } else {
                setErrorEditFood(list.message);
            }
        } catch (error) {
            setErrorEditFood(error.message);
        }

    };
    return {
        successEditFood,
        errorEditFood,
        editSingleFood
    };
};

export default useEditFood;
