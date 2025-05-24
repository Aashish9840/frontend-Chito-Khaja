import toast from "react-hot-toast";
import React from "react";
import Image from "next/image";

export const Toaster = ({ message, type }) => {
  const icons = {
    success: "/images/successtoast.svg",
    error: "/images/error.svg",
  };

  const cancel = {
    success: "/images/successCancel.svg",
    error: "/images/errorCancel.svg",
  };

  return (
    <div className="flex items-center justify-between gap-15 w-[350px] px-4 py-2 border border-white rounded-lg shadow-sm bg-[#FFFF]">
      <div className="flex items-center gap-3 justify-start">
        <Image
          src={icons[type]}
          width={30}
          height={30}
          alt="toast icon"
          className="h-[15px] w-[15px]"
        />
        <h1 className="text-black text-base font-medium">{message}</h1>
      </div>
      <Image
        src={cancel[type]}
        width={30}
        height={30}
        alt="close toast"
        className="h-[25px] w-[25px] cursor-pointer"
        onClick={() => toast.remove()}
      />
    </div>
  );
};

export const successToast = (message) => {
  toast.custom(<Toaster message={message} type="success" />);
};

export const errorToast = (message) => {
  toast.custom(<Toaster message={message} type="error" />);
};
