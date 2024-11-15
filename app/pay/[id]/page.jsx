'use client'
import { Navbar } from "@/app/_components/navbar_mobile"
import ProfileBar from "@/app/_components/profileBar"
import { ListingCardPaySmall } from "../_components/listingCardPaySmall"
import { ListingCardPayMedium } from "../_components/listingCardPayMedium"
import { useEffect, useState } from "react";
import { Footer } from "@/app/_components/footer"


const payPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <main className="bg-timberwolf h-full pt-3 relative">
      <div className='flex items-center justify-between w-full px-4 '>
        <img src="/logo.png" alt="page.jsx" className='w-22 h-10' />
        {/* <img src="/Font_logo_Ljus.png" alt="page.jsx" className='w-22 h-10 bg-fernGreen text-green-300' /> This logo cannot change its text colour with css, so im commenting it out */}
        <ProfileBar/>
      </div>
      {windowWidth <= 768 ? <ListingCardPaySmall/> :<ListingCardPayMedium/>}
      <Navbar/>
      <Footer/>
    </main>
  )
}
export default payPage