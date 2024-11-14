'use client'

import { Navbar } from './_components/navbar_mobile'
import { ListingCard } from './_components/listingCard'
import ProfileBar from './_components/profileBar'
import { Footer } from './_components/footer'

const LandingPage = () => {



  
  return (
    <main className="bg-timberwolf h-screen overflow-hidden pt-3 relative">
      <div className='flex items-center justify-between w-full px-4'>
        <img src="/logo.png" alt="hej" className='w-22 h-10' />
        <ProfileBar/>
      </div>
      <ListingCard/>
      <Navbar/>
      <Footer/>
    </main>
  )
}
export default LandingPage 