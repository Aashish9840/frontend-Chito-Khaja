"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import Header from "../reuseComponents/Header";
import { singleFood } from "../ContextAPI/SingleFoodContext";
import Image from "next/image";
import useGetSingleFood from "../services/users/useGetSingleFood";
import { useRouter, useSearchParams } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import useGetAllFood from "../services/users/useGetAllFood";
import FoodCart from "../components/FoodCart";
import Footer from "../components/Footer";
import useAddToCart from "../services/users/useAddToCart";
import { errorToast, successToast } from "../reuseComponents/ReactToast";
import { userValidate } from "../ContextAPI/IsUserAuthContext";
import { AuthForm } from "../ContextAPI/AuthFormContext";

const PageContent = () => {
  const params = useSearchParams();
  const router = useRouter();
  const foodId = params.get("foodId");
  const [quantity, setQuantity] = useState(1);
  const { validateUser } = useContext(userValidate);
  const { setShowLogIn } = useContext(AuthForm);
  useEffect(() => {
    if (!foodId) {
      router.push("/");
    }
  }, [foodId]);
  const imagePath = process.env.NEXT_PUBLIC_IMAGE;

  const { setCallUserValidate } = useContext(userValidate);
  const { singleFood, errorSingleFood, getSingleFood } = useGetSingleFood();
  const { successFoodList, errorFood, getAllFood } = useGetAllFood();
  const { successCart, errorCart, getCart } = useAddToCart();

  useEffect(() => {
    if (foodId) {
      getSingleFood(foodId);
    }
  }, [foodId]);

  useEffect(() => {
    if (singleFood) {
      getAllFood(singleFood.category);
    }
  }, [singleFood]);

  const handleCart = (foodId, prize, name, image) => {
    if (!validateUser) {
      return setShowLogIn(true);
    }

    getCart(foodId, quantity, prize, name, image);
  };
  useEffect(() => {
    if (successCart) {
      successToast(successCart);
      setQuantity(0);
      setCallUserValidate((prev) => !prev);
    }
    if (errorCart) {
      errorToast(errorCart);
    }
  }, [successCart, errorCart]);
  return (
    <div className="container px-4 sm:px-0">
      <Header />
      <div
        className="flex cursor-pointer items-center mt-6"
        onClick={() => router.push("/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 512 512"
        >
          <path
            fill="#7b6868"
            d="M497.333 239.999H80.092l95.995-95.995l-22.627-22.627L18.837 256L153.46 390.623l22.627-22.627l-95.997-95.997h417.243z"
          />
        </svg>
        <h1 className="text-base text-gray-500 font-dm_sans font-medium">
          Home
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 16 16"
        >
          <path fill="#7b6868" d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3" />
        </svg>
        <h1 className="text-base text-gray-500 font-dm_sans font-medium">
          {singleFood?.category}
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 16 16"
        >
          <path fill="#7b6868" d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3" />
        </svg>
        <h1 className="text-base text-gray-500 font-dm_sans font-medium">
          {singleFood?.name}
        </h1>
      </div>
      <section className=" flex justify-between flex-col sm:flex-row gap-4 lg:gap-20 items-center py-6 h-fit sm:h-[60vh] lg:h-[90vh]">
        <div className="w-full sm:w-[60%] lg:w-[50%] h-full">
          <Image
            src={`${imagePath}/${singleFood?.image}`}
            width={300}
            height={300}
            alt="food image"
            className="w-full h-full rounded-lg object-center object-cover"
          />
        </div>
        <div className="h-full w-full sm:w-[60%] lg:[50%] flex flex-col gap-3 lg:gap-8">
          <section className="flex gap-1 flex-col">
            <h1 className="text-3xl font-semibold font-dm_sans">
              {singleFood?.name}
            </h1>
            <h2 className="text-[16px] font-medium font-dm_sans my-2">
              Rs. {singleFood?.prize}
            </h2>
          </section>
          <section>
            <h1 className="text-[16px] font-dm_sans">Quantity</h1>
            <div className="flex gap-4 my-2 items-center w-[150px] h-fit py-2 px-2 justify-around border border-gray-400 rounded-sm">
              <Minus
                size={20}
                className={`${
                  quantity < 2 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity((prev) => prev - 1);
                  }
                }}
              />
              <h1 className="text-sm font-medium font-dm_sans bg-none">
                {quantity}
              </h1>
              <Plus
                size={20}
                className="cursor-pointer"
                onClick={() => setQuantity((prev) => prev + 1)}
              />
            </div>
          </section>
          <section className="flex gap-1 flex-col">
            <h1 className="text-[16px] font-medium font-dm_sans">
              Description
            </h1>
            <h2 className="text-[16px] font-dm_sans">
              {singleFood?.description}
            </h2>
          </section>
          <button
            className="py-3 bg-black/90 text-white text-base font-medium hover:bg-black/80 rounded-lg w-full font-dm_sans"
            onClick={() =>
              handleCart(
                singleFood._id,
                singleFood.prize,
                singleFood.name,
                singleFood.image
              )
            }
          >
            Add to Cart
          </button>
        </div>
      </section>

      <section className="my-16">
        <h1 className="text-3xl font-commissioner font-semibold">
          Recommended for you
        </h1>
        <div
          className="grid my-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 h-fit w-full"
          id="foodlist"
        >
          {successFoodList?.map((food, index) => (
            <FoodCart food={food} key={index} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};
export default page;
