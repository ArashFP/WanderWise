'use client'

import { House, Search, UserRoundPen } from "lucide-react"
import { useRouter } from "next/navigation"

export const Navbar = () => {
  const router = useRouter()

  const handleHouseClick = () => {
    router.push('/')
  }
  const handleSearchClick = () => {
    router.push('/search_page')
  }
  const handleUserClick = () => {
    router.push('/profile')
  }

  return (
    <nav className="flex content-center items-center justify-between absolute bottom-0 w-full shrink-0 h-20 bg-fernGreen text-timberwolf" style={{ padding: "0px 60px" }}>
      <House className="w-11 h-11 shrink-0"  onClick={handleHouseClick}/>
      <Search className="w-11 h-11 shrink-0 " onClick={handleSearchClick}/>
      <UserRoundPen className="w-11 h-11 shrink-0" onClick={handleUserClick}/>
    </nav>
  )
}