'use client'
import axios from "axios"
import { Dot, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export const ListingCard = () => {
  const [listings, setListings] = useState([])
  const [visibleListings, setVisibleListings] = useState(3)
  const [error, setError] = useState(null)


  const fetchListings = async (retryCount = 3) => {
    try {
      const response = await axios.get("/api/listings")
      const listings = response.data
      setListings(listings)
      console.log(listings)
    } catch (error) {
      console.log("error", error)
      if (retryCount > 0) {
        setTimeout(() => fetchListings(retryCount - 1), 1000)
      } else {
        setError("Failed to load listings. Please try again later.")
      }
    }
  }

  useEffect(() => {
    fetchListings();
  }, [])

  useEffect(() => {
    const updateVisibleListings = () => {
      if (window.innerWidth >= 1290) {
        setVisibleListings(9)
      } else if (window.innerWidth >= 1060) {
        setVisibleListings(6)
      } else {
        setVisibleListings(3)
      }
    }

    updateVisibleListings()
    window.addEventListener('resize', updateVisibleListings)
    return () => window.removeEventListener('resize', updateVisibleListings)
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {listings.slice(0, visibleListings).map((listing) => (
          <Link className="w-80 h-48" key={listing.id} href={`/detail_page/${listing.id}`}>
            <div className="bg-timberwolf flex-grow w-80 h-40 rounded-l p-4 mt-2 flex flex-col">
              <img
                src={listing.images[0].url}
                alt="Listing Image"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="flex">
                <div>
                  <p className="text-black">{listing.price} Euro/Night</p>
                  <p className="text-black">{listing.title}</p>
                </div>
                <div className="bg-timberwolf flex items-center justify-center ml-auto">
                  <Star className="text-iconColor fill-iconColor" />
                  <p className="font-bold">
                    <span className="text-black"> {listing.rating} </span>
                    <span className="underline text-black"> {listing.reviews} reviews </span>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}