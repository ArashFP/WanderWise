import { Navbar } from './_components/navbar_mobile'
import { ListingCard } from './_components/listingCard'
import { Searchbar_mobile } from './_components/searchbar_mobile'

const LandingPage = () => {



  
  return (
    <main className="bg-timberwolf h-screen pt-3">
      <div className='flex items-center justify-between w-full px-4'>
        <img src="/logo.png" alt="hej" className='w-22 h-10' />
        <Searchbar_mobile/>
      </div>
      <ListingCard/>
      <Navbar/>
    </main>
  )
}
export default LandingPage 