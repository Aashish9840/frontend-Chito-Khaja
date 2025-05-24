"use client";
import React from "react";
import Admin from "./components/Admin";
import ProtectedRoute from "../reuseComponents/ProtectedRoute";
const page = () => {
  return (
    <>
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    </>
  );
};

export default page;
