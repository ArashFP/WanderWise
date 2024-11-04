'use client'
import axios from "axios"
import { Dot, Star } from "lucide-react"
import { useEffect, useState } from "react"

export const ListingCard = () => {
  const [listings, setListings] = useState([])

  const fetchListings = async () => {
    try {
      const response = await axios.get("/api/listings")

      const listings = response.data
      setListings(listings)
      console.log(listings)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    fetchListings();
  }, [])


  return (
    <div>
      {listings.slice(0,3).map((listing) => (
        <div key={listing.id} className="bg-timberwolf w-80 h-52 rounded-l p-4 m-4 gap-3">
          <img
            src={listing.images[0].url}
            alt="Listing Image"
            className="w-full h-full object-cover mt-2 rounded-xl"
          />
          <div className="flex">
            <div>
              <p>{listing.price}Euro/Night</p>
              <p>{listing.title}</p>
            </div>
            <div className="bg-timberwolf flex items-center justify-center ml-auto">
              <Star className="text-iconColor fill-iconColor"/>
              <p className="font-bold">
                <span> {listing.rating} </span> 
                <span className="underline"> {listing.reviews} reviews </span> 
                </p>
            </div>
          </div>

        </div>
      ))}
    </div>
  )
}