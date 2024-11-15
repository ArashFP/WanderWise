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
  Dot,
} from "lucide-react";
import { BookingContext } from "@/lib/context/bookingContext";
import React, { useContext, useEffect, useState } from "react";
import getDocument from "@/lib/getDocument";
import { format } from "date-fns";


export const ListingCardPayMedium = () => {
  const { totalPrice, checkInDate, checkOutDate, price, days } =
    useContext(BookingContext);
  const [id, setId] = useState("");
  const [listing, setListing] = useState(null);

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

  useEffect(() => {
    if (listing) {
      console.log(listing);
    }
  }, [listing]);

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
    return <p className="text-black">Loading...</p>;
  }

  return (
    <main className="text-black h-auto bg-timberwolf">
      <div className=" grid grid-cols-2 grid-rows-[auto,1fr,auto,auto,auto] w-1/2 mx-auto mt-10">
        <div className="col-span-2 text-left text-2xl">
          <p>{listing.title}</p>
        </div>
        <div className="w-full flex justify-center">
          <img
            src={listing.images[0].url}
            alt="listing"
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="flex items-center text-center pl-3">
          <p>{listing.description}</p>
        </div>
        <div className="col-span-2 flex">
          <Star className="text-iconColor fill-iconColor" />
          <p className="font-semibold">{listing.rating}</p>
          <Dot className="text-iconColor fill-iconColor" />
          <p className="underline font-semibold">{listing.reviews} Reviews</p>
        </div>
        <div className="flex flex-col mt-3 px-8 col-span-2 gap-1">
          <p className="text-lg font-semibold">Price Information</p>
          <div className="flex justify-between">
            <p>{price} Euro x {days} days</p>
            <p>{totalPrice} Euro</p>
          </div>
          <div className="flex justify-between border-b-2 border-black">
            <p>WanderWise service fee</p>
            <p>{listing.wanderwise_fee} Euro</p>
          </div>
          <div className="flex justify-between mt-3 font-semibold text-lg">
            <p>Total (Euro)</p>
            <p>{totalPrice + listing.wanderwise_fee} Euro</p>
          </div>
          <div className="bg-timberwolf border-2 border-fernGreen flex flex-col gap-3 mt-10 rounded-lg w-2/3 col-span-2 mx-auto">
            <p className="px-6 pt-3">Your Journey</p>
            <p className="px-6">
              {checkInDate ? format(checkInDate, "dd/MM/yyyy") : ""} -{" "}
              {checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : ""}
            </p>
            <div className="px-6 pt-3">
              <ul>
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 py-3">
                    <span>{React.cloneElement(amenitiesIcons[amenity], { width: '50px', height: '50px' }) || amenity}</span>
                    <span className="text-black px-10">{amenity}</span>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-timberwolf col-span-2 mx-8 my-5">
          <p className="font-bold text-2xl text-center">Credit Card Details</p>
          <div className="flex justify-between border-BrunswickGreen border-2 px-3 py-2 mx-4 mt-4 rounded-xl shadow-2xl">
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
            <div className="mt-2 p-3">
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
              className="flex w-full mx-4 justify-center rounded-lg p-1 text-timberwolf bg-BrunswickGreen"
              onClick={handlePayNowClick}
            >
              <p>Pay Now</p>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
