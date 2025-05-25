
import Header from "./reuseComponents/Header"
import Hero from './components/Hero'
export default function Home() {
  return (
    <>
      <div className="container  h-screen">
        <Header />
        <Hero />
      </div >
    </>
  );
}