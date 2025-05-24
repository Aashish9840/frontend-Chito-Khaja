import { CloudDrizzle } from "lucide-react";
import { useState } from "react";


const usegetAddFood = () => {
    const [successFood, setSuccessFood] = useState(null);
    const [errorFood, setErrorFood] = useState(null);
    const getAddFood = async (form) => {

        console.log(form)
        try {
            setSuccessFood(null);
            setErrorFood(null);


            const formData = new FormData();

            const data = Object.keys(form)
            data.forEach((forminput) => {

                if (form[forminput] !== "") {
                    formData.append(forminput, form[forminput])
                }
            })
            const request = await fetch(`/api/food/add`, {
                method: "POST",
                body: formData

            });
            const list = await request.json();

            if (request.ok) {
                setSuccessFood(list.message);
            } else {
                setErrorFood(list.message);
            }
        } catch (error) {
            setErrorFood(error.message);
        }
    };
    return {
        successFood,
        errorFood,
        getAddFood
    };
};

export default usegetAddFood;
