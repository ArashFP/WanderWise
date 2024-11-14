"use client";

import {
  Star,
  House,
  AirVent,
  ShowerHead,
  Wifi,
  BedDouble,
  BedSingle,
  User,
  ChevronDown,
  WifiOff,
  FlameKindling,
  Caravan,
  Backpack,
  Trees,
  Dumbbell,
} from "lucide-react";
import { BookingContext } from "@/lib/context/bookingContext";
import getDocument from "@/lib/getDocument";
import { useContext, useEffect, useState } from "react";
import { format } from 'date-fns';
import updateDocument from "@/lib/updateDocument";
import { useRouter } from "next/navigation";

export const ListingCardPay = () => {
  const [id, setId] = useState("");
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const { totalPrice, checkInDate, checkOutDate } = useContext(BookingContext);


  const amenitiesIcons = {
    House: <House className="text-iconColor" />,
    AC: <AirVent className="text-iconColor" />,
    Shower: <ShowerHead className="text-iconColor" />,
    Wifi: <Wifi className="text-iconColor" />,
    NoWifi: <WifiOff className="text-iconColor" />,
    DoubleBed: <BedDouble className="text-iconColor" />,
    SingleBed: <BedSingle className="text-iconColor" />,
    OutdoorFirePit: <FlameKindling className="text-iconColor" />,
    CampingFriendly: <Caravan className="text-iconColor" />,
    StorageRoom: <Backpack className="text-iconColor" />,
    Nautre: <Trees className="text-iconColor" />,
    Gym: <Dumbbell className="text-iconColor" />,
  };


  useEffect(() => {
    const urlParams = window.location.pathname;
    const docId = urlParams.replace("/pay/", "");
    setId(docId);
  }, []);

  useEffect(() => {
    if (listing) {
      console.log(listing);
    }
  }, [listing]);

  useEffect(() => {
    if (!id) return;

    const fetchListing = async () => {
      const result = await getDocument("listings", id);
      if (result.error) {
        setError(result.error);
      } else {
        setListing(result);
      }
    };

    fetchListing();
  }, [id]);

  const handlePayNowClick = async () => {
    if (!listing) return;
  
    // Check if the listing is already booked
    if (listing.booked) {
      router.push('/pay/pay_failed');
      return;
    }
  
    const updatedListing = { ...listing, booked: true };
  
    const result = await updateDocument("listings", id, updatedListing);
    if (result.error) {
      setError(result.error);
      router.push('/pay/pay_failed');
    } else {
      setListing(updatedListing);
      router.push('/pay/pay_success');
    }
  };

  if (!listing) {
    return <p className="text-black">Loading...</p>; // You can replace this with a loading spinner or any other loading indicator
  }

  return (
    <main className="text-black">
      <div className="flex justify-center w-full">
        <img src="/logo.png" alt="hej" className="w-22 h-10" />
      </div>
      <div className="bg-timberwolf w-80 h-48 rounded-l p-4 m-4 mt-7 flex flex-col">
        <img
          src={listing.images[0].url}
          alt="Listing Image"
          className="w-full h-full object-cover mt-2 rounded-xl"
        />
        <div className="flex">
          <div>
            <p className="font-bold text-sm">{listing.price} Euro/Night</p>
            <p className="font-bold text-sm">{listing.title}</p>
          </div>
          <div className="flex pl-3 items-center">
            <Star className="text-iconColor fill-iconColor" />
            <p className="font-bold">
              <span className="text-black"> {listing.rating} </span>
              <span className="underline text-black">
                {listing.reviews} reviews{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-BrunswickGreen border-2 mx-4 mt-10 rounded-xl shadow-2xl">
        <p className="font-bold px-3 pt-2">{listing.title}</p>
        <div className="flex">
          <p className="pl-3 pt-2">
            {checkInDate ? format(new Date(checkInDate), 'dd/MM/yyyy') : 'N/A'} -
          </p>
          <p className="pt-2">
            {checkOutDate ? format(new Date(checkOutDate), 'dd/MM/yyyy') : 'N/A'}
          </p>
        </div>
        <div className="flex flex-col flex-wrap px-3 pt-2 gap-3 mb-2">
          {listing.amenities.map((amenity, index) => (
            <div key={index} className="flex  items-center mr-4">
              {amenitiesIcons[amenity] || amenity}
              <span className="text-sm text-black">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="flex justify-center mt-5 font-semibold text-lg">
        Credit Card Details
      </p>
      <div className="flex justify-evenly border-BrunswickGreen border-2 px-3 py-2 mx-4 mt-4 rounded-xl shadow-2xl">
        <div className="flex flex-col text-gray-700">
          <p>Payment</p>
          <p>Method</p>
        </div>
        <div className="flex gap-3">
          <img src="/amex.png" alt="hej" className='w-22 h-10' />
          <img src="/mastercard.png" alt="hej" className='w-22 h-10' />
          <img src="/visa.png" alt="hej" className='w-22 h-10' />
        </div>
      </div>
      <div className="flex justify-between border-BrunswickGreen border-2 px-3 py-2 mx-4 mt-4 rounded-xl shadow-2xl">
        <p>Saved Cards</p>
        <ChevronDown />
      </div>
      <div className="flex flex-col justify-between border-BrunswickGreen border-2 px-3 py-2 mx-4 mt-4 rounded-xl shadow-2xl">
        <p>Debit Card</p>
        <div className="flex flex-col justify-between border-BrunswickGreen border-2 px-3 py-2 mx-4 mt-4 rounded-xl shadow-2xl">
          <p>**** **** **** 1234</p>
          <p>Exp. 12/23</p>
        </div>
        <div className="mt-2">
          <p> + Add New Card </p>
        </div>
      </div>
      <div className="flex flex-col justify-between border-BrunswickGreen border-2 px-3 py-2 mx-4 mt-4 rounded-xl shadow-2xl">
        <p>Payment Details</p>
        <hr className="bg-BrunswickGreen mt-2 mb-3 opacity-100" />
        <div className="flex justify-between w-full">
          <p>Order</p>
          <p>Euro {totalPrice}</p>
        </div>
        <hr className="bg-BrunswickGreen mt-2 mb-3 opacity-100" />
        <div className="flex justify-between w-full">
          <p>Total</p>
          <p>Euro {totalPrice}</p>
        </div>
      </div>
      <div className="flex justify-center w-full mt-4 pb-24">
        <button
          className="flex w-2/3 justify-center rounded-lg p-1 text-timberwolf bg-BrunswickGreen"
          onClick={handlePayNowClick}
        >
          <p>Pay Now</p>
        </button>
      </div>
    </main>
  );
};
