
'use client'
import Header from "./reuseComponents/Header"
import Hero from './components/Hero'
import FoodList from './components/FoodList'
import Footer from './components/Footer'
import { useContext } from "react"
import { usePaymentContext } from "./ContextAPI/PaymentContext"
import PaymentSuccess from './components/PaymentSuccess'
export default function Home() {
  const { successPayment, showPaymentDialogue, setShowPaymentDialogue } = useContext(usePaymentContext)
  console.log(successPayment, showPaymentDialogue, "hello hello")
  return (
    <>
      <div className=" px-3  h-screen">
        <Header />
        <Hero />
        {
          showPaymentDialogue?.showSuccess && <PaymentSuccess successPayment={successPayment} showPaymentDialogue={showPaymentDialogue} setShowPaymentDialogue={setShowPaymentDialogue} />
        }
        <FoodList />
        <Footer />
      </div >
    </>
  );
}