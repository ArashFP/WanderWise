
import { Navbar } from "@/app/_components/navbar_mobile"
import ProfileBar from "@/app/_components/profileBar"
import { ListingCardPay } from "../_components/listingCardPay"


const payPage = () => {
  
  return (
    <main className="bg-timberwolf h-full pt-3 relative">
      <div className='flex items-center justify-between w-full px-4'>
        <img src="/logo.png" alt="hej" className='w-22 h-10' />
        <ProfileBar/>
      </div>
      <ListingCardPay/>
      <Navbar/>
    </main>
  )
}
export default payPage