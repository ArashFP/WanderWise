'use client'
import axios from "axios"
import { Dot, Star } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export const ListingCard = () => {
  const searchParams = useSearchParams()
  const [listings, setListings] = useState([])
  const [filteredListings, setFilteredListings] = useState([])

  const fetchListings = async () => {
    try {
      const response = await axios.get("/api/listings")
      const listings = response.data
      setListings(listings)
      // console.log('ALL Listings fetched', listings)
    } catch (error) {
      console.log("error", error)
    }
  }

  const filterListings = () => {
    const categories = searchParams.get('categories')?.split(',') || [];
    const priceParam = searchParams.get('price');
    const price = priceParam ? parseFloat(priceParam) : null;
    const destination = searchParams.get('destination');
    const consoleSeperator = '------------------------------------';

  
    const filteredListings = listings.filter(listing => {
      const matchesCategories = categories.length > 0 ? categories.some(category => listing.categories.includes(category)) : true;
      const matchesPrice = price !== null ? parseFloat(listing.price) <= price : true;
      const matchesDestination = destination ? listing.title?.toLowerCase().includes(destination.toLowerCase()) : true;
    
      console.log(consoleSeperator)
      console.log(`Matches Destination: ${listing.title} ${matchesDestination}`)
      console.log(`Matches Category: ${listing.title} ${matchesCategories}`)
      console.log(`Matches Price: ${listing.title} ${matchesPrice}`)
      return matchesCategories && matchesPrice && matchesDestination;
    });
    
    setFilteredListings(filteredListings);
    console.log('Filtered Listings after setting state:', filteredListings);
  };

  useEffect(() => {
    fetchListings()
  }, [])

  useEffect(() => {
    if (listings.length > 0) {
      filterListings()
    }
  }, [searchParams, listings])

  return (
    <div>
      {filteredListings.length > 0 ? (
        filteredListings.map((listing) => (
          <div key={listing.id} className="bg-timberwolf w-80 h-52 rounded-l p-4 m-4 gap-3">
            <img
              src={listing.images[0].url}
              alt="Listing Image"
              className="w-full h-full object-cover mt-2 rounded-xl"
            />
            <div className="flex">
              <div>
                <p>{listing.price} Euro/Night</p>
                <p>{listing.title}</p>
              </div>
              <div className="bg-timberwolf flex items-center justify-center ml-auto">
                <Star className="text-iconColor fill-iconColor" />
                <p className="font-bold">
                  <span> {listing.rating} </span>
                  <span className="underline"> {listing.reviews} reviews </span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No listings match the filter criteria.</p>
      )}
    </div>
  );
}