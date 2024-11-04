'use client'
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"



export const Searchbar_mobile = () => {
  const router = useRouter()

  const handleSearchClick = () => {
    router.push('/search_page')
  }


  return (
      <button className="relative w-44 h-8 mx-auto bg-BrunswickGreen text-center text-timberwolf rounded-xl pl-10 flex items-center justify-center" onClick={handleSearchClick}>
        <span className="text-timberwolf">Search...</span>
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-timberwolf" />
      </button>
  )
}