'use client'
import { Navbar } from "@/app/_components/navbar_mobile"
import ProfileBar from "@/app/_components/profileBar"
import { ListingCardSingle } from "./_components/listingCardSingle"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const detailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [id, setId] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fullPath = window.location.pathname + window.location.search;
      const relativePath = fullPath.replace('/detail_page', '');
      setId(relativePath); // Get everything after /detail_page
      console.log(relativePath + " " + "id from [id] page.jsx")
    }
  }, [router]);


  return (
    <main className="bg-timberwolf h-screen pt-3">
      <div className='flex items-center justify-between w-full px-4'>
        <img src="/logo.png" alt="hej" className='w-22 h-10' />
        <ProfileBar />
      </div>
      <ListingCardSingle id={id}/>
      <Navbar />
    </main>
  )
}
export default detailPage