
import Header from "./reuseComponents/Header"
import MenuSection from './components/MenuSection'
import Hero from './components/Hero'
export default function Home() {
  return (
    <>
      <div className=" px-3 container  h-screen">
        <Header />
        <Hero />
        <MenuSection />
      </div >
    </>
  );
}