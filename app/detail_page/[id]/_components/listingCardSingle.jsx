'use client'

import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import getDocument from "../../../../lib/getDocument";


export const ListingCardSingle = ({ id }) => {

  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Document IDd in listingCardSingle', id); 

    if (!id) return;

    const fetchListing = async () => {
      const result = await getDocument('listings', id) 
      if (result.error) {
        setError(result.error);
      } else {
        setListing(result);
      }
    };

    fetchListing();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="bg-timberwolf w-80 h-48 rounded-l p-4 m-4 mt-7 flex flex-col">
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
    </div>
  );
};