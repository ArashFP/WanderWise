'use client'

import { Searchbar } from "../_components/searchbar"
import { Navbar } from "../_components/navbar_mobile"
import { ListingCardSearch } from "./_components/listingCardSearch"
import { Footer } from "../_components/footer"
import ProfileBar from "../_components/profileBar"


const SearchResult = () => {

  return (
    <main className="bg-timberwolf h-screen pt-3 flex flex-col">
      <div className='flex items-center justify-between w-full px-4'>
        <img src="/logo.png" alt="hej" className='w-22 h-10' />
        <Searchbar/>
        <ProfileBar/>
      </div>
      <div className="flex-grow overflow-auto pb-32">
        <ListingCardSearch />
      </div>
      <div className="mt-auto">
        <Navbar />
        <Footer />
      </div>
    </main>
  )
}

export default SearchResult