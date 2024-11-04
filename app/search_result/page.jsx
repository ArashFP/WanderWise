'use client'

import { Searchbar_mobile } from "../_components/searchbar_mobile"
import { Navbar } from "../_components/navbar_mobile"
import { ListingCard } from "./_components/listingCardSearch"

const SearchResult = () => {

  return (
    <main className="bg-timberwolf h-screen pt-3 flex flex-col">
      <div className='flex items-center justify-between w-full px-4'>
        <img src="/logo.png" alt="hej" className='w-22 h-10' />
        <Searchbar_mobile />
      </div>
      <div className="flex-grow overflow-auto pb-32">
        <ListingCard />
      </div>
      <div className="mt-auto">
        <Navbar />
      </div>
    </main>
  )
}

export default SearchResult