'use client'
import axios from "axios"
import { Dot, Star } from "lucide-react"
import Link from "next/link"
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
      {listings.slice(0, 3).map((listing) => (
        <Link key={listing.id} href={`/detail_page/${listing.id}`}>
          <div className="bg-timberwolf w-80 h-48 rounded-l p-4 m-4 mt-7 flex flex-col">
            <img
              src={listing.images[0].url}
              alt="Listing Image"
              className="w-full h-full object-cover mt-2 rounded-xl"
            />
            <div className="flex">
              <div>
                <p className="text-black">{listing.price} Euro/Night</p>
                <p className="text-black">{listing.title}</p>
              </div>
              <div className="bg-white flex items-center justify-center ml-auto">
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
  );
}