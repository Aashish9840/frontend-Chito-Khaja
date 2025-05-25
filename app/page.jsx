
import Header from "./reuseComponents/Header"
import Hero from './components/Hero'
import FoodList from './components/FoodList'
export default function Home() {
  return (
    <>
      <div className=" px-3 container  h-screen">
        <Header />
        <Hero />
        <FoodList />
      </div >
    </>
  );
}