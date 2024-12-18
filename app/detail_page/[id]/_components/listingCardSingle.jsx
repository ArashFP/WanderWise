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
  Dumbbell,
  Trees,
  Backpack,
  FlameKindling,
  WifiOff,
  Caravan,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import getDocument from "../../../../lib/getDocument";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { format, differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import { BookingContext } from "@/lib/context/bookingContext";


export const ListingCardSingle = ({ id }) => {
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  const { setTotalPrice, totalPrice, setCheckInDate, checkInDate, setCheckOutDate, checkOutDate, setDays, days, setPrice } = useContext(BookingContext);

  const router = useRouter();

  const amenitiesIcons = {
    House: <House className="text-iconColor" />,
    AC: <AirVent className="text-iconColor" />,
    Shower: <ShowerHead className="text-iconColor" />,
    WiFi: <Wifi className="text-iconColor" />,
    NoWiFi: <WifiOff className="text-iconColor" />,
    DoubleBed: <BedDouble className="text-iconColor" />,
    SingleBed: <BedSingle className="text-iconColor" />,
    OutdoorFirePit: <FlameKindling className="text-iconColor" />,
    CampingFriendly: <Caravan className="text-iconColor" />,
    StorageRoom: <Backpack className="text-iconColor" />,
    Nautre: <Trees className="text-iconColor" />,
    Gym: <Dumbbell className="text-iconColor" />,
  };

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
    if (!checkInDate || !checkOutDate || !listing) return;

    const numberOfDays = differenceInDays(checkOutDate, checkInDate);
    const totalCost = listing.price * numberOfDays;
    setPrice(listing.price);
    setDays(numberOfDays);
    setTotalPrice(totalCost);
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);
  }, [checkInDate, checkOutDate, listing, setTotalPrice, setCheckInDate, setCheckOutDate]);

  const incrementAdults = () => setAdults(adults + 1);
  const decrementAdults = () => setAdults(adults > 1 ? adults - 1 : 1);
  const incrementChildren = () => setChildren(children + 1);
  const decrementChildren = () => setChildren(children > 0 ? children - 1 : 0);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleCheckIn = () => setIsCheckInOpen(!isCheckInOpen);
  const toggleCheckOut = () => setIsCheckOutOpen(!isCheckOutOpen);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!listing) {
    return <div>Loading...</div>;
  }

  const owner = listing.owner[0];

  const handleBookNowClick = () => {
    router.push("/pay" + id);
  };

  return (
    <div className="flex justify-center">
      <div className="bg-timberwolf w-80 h-48 rounded-l p-4 m-4 mt-7 flex flex-col md:w-2/3">
        <div className="md:flex gap-10 w-full">
          <div className="w-full">
            <div className="w-full">
              <img
                src={listing.images[0].url}
                alt="Listing Image"
                className="w-full h-auto object-cover mt-2 rounded-xl"
              />
              <div className="mt-2 hidden md:flex">
                {listing.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Listing Image ${index + 1}`}
                    className="w-1/2 h-20 object-cover rounded-xl mr-2"
                  />
                ))}
              </div>
            </div>
            <div className="flex">
              <div>
                <p className="text-black text-sm">{listing.price} Euro/Night</p>
                <p className="text-black text-sm">{listing.title}</p>
              </div>
              <div className="bg-timberwolf flex items-center justify-center ml-auto">
                <Star className="text-iconColor fill-iconColor" />
                <p className="font-bold">
                  <span className="text-black text-sm"> {listing.rating} </span>
                  <span className="underline text-black text-sm">
                    {" "}
                    {listing.reviews} reviews{" "}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <div>
              <p className="text-sm mt-2 text-black">{listing.description}</p>
            </div>
            <hr className="bg-BrunswickGreen mt-2 mb-3 opacity-100" />
            <div className="flex flex-wrap gap-3 justify-between w-full">
              {listing.amenities.map((amenity, index) => (
                <div key={index} className="flex flex-col items-center mr-4">
                  {amenitiesIcons[amenity] || amenity}
                  <span className="text-sm text-black">{amenity}</span>
                </div>
              ))}
            </div>
            <div className="bg-timberwolf border-darkGreen border-2 rounded-xl mt-3 p-1 px-2 lg:h-1/3">
              <p className="text-black"> Cancellation Policy:</p>
              <p className="text-sm text-black">{listing.cancellation_policy}</p>
            </div>
          </div>
        </div>
        <div className="md:flex w-full gap-3">
          <div className="mt-7 object-cover md:mt-3 md:w-1/2">
            <img src="/gmapspng.png" alt="google maps location" />
          </div>
          <div className="bg-timberwolf border-darkGreen border-2 rounded-xl mt-3 p-1 px-2 flex flex-col items-center md:w-1/2 justify-center">
            {owner.image ? (
              <img
                src={owner.image}
                alt="Owner Image"
                className="w-10 h-10 rounded-full mr-2"
              />
            ) : (
              <User className="w-10 h-10 text-iconColor fill-iconColor my-2" />
            )}
            <div className="mb-2">
              <p className=" text-black font-semibold">{owner.name}</p>
              <p className="text-sm">
                <span className="font-bold text-black">Phone:</span>{" "}
                <span className="underline text-black">{owner.phone}</span>
              </p>
              <p className="text-sm">
                <span className="font-bold text-black">Email:</span>{" "}
                <span className="underline text-black">{owner.email}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-timberwolf border-darkGreen border-2 rounded-xl lg:w-8/12 lg:mx-auto mt-3 p-1 px-2">
          <div className="flex flex-col gap-3 items-center justify-between">
            <p className="text-xl text-black">
              {"Price per night " + listing.price + " Euro"}
            </p>
            <p
              className="text-lg text-black font-bold cursor-pointer border-BrunswickGreen border-2 w-2/3 flex justify-between px-2"
              onClick={toggleDropdown}
            >
              Guests <ChevronDown />
            </p>
            {isDropdownOpen && (
              <div className="flex flex-col justify-between items-center mt-2">
                <div className="flex justify-between items-center w-2/3">
                  <p className="mr-5 text-black">Adults</p>
                  <div className="flex items-center">
                    <button
                      onClick={decrementAdults}
                      className="px-2 py-1 text-black bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <p className="mx-2 text-black">{adults}</p>
                    <button
                      onClick={incrementAdults}
                      className="px-2 py-1 text-black bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center w-2/3 mt-2">
                  <p className="mr-2 text-black">Children</p>
                  <div className="flex items-center">
                    <button
                      onClick={decrementChildren}
                      className="px-2 py-1 text-black bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <p className="mx-2 text-black">{children}</p>
                    <button
                      onClick={incrementChildren}
                      className="px-2 py-1 text-black bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center gap-3 mt-3 w-full">
            <div
              className="flex flex-col items-center cursor-pointer border-BrunswickGreen border-2 w-1/2 relative"
              onClick={toggleCheckIn}
            >
              <p className="mr-2 text-black flex justify-center items-center">
                {checkInDate
                  ? format(checkInDate, "dd/MM/yyyy")
                  : "Check-in Date"}{" "}
                <ChevronDown />
              </p>
              {isCheckInOpen && (
                <div className="absolute top-full left-0 w-full z-10">
                  <DatePicker
                    selected={checkInDate}
                    onChange={(date) => setCheckInDate(date)}
                    inline
                  />
                </div>
              )}
            </div>
            <div
              className="flex flex-col items-center cursor-pointer border-BrunswickGreen border-2 w-1/2 relative"
              onClick={toggleCheckOut}
            >
              <p className="mr-2 text-black flex justify-center items-center">
                {checkOutDate
                  ? format(checkOutDate, "dd/MM/yyyy")
                  : "Check-out Date"}{" "}
                <ChevronDown />
              </p>
              {isCheckOutOpen && (
                <div className="absolute top-full right-full w-full z-10 md:right-0">
                  <DatePicker
                    selected={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
                    inline
                  />
                </div>
              )}
            </div>
          </div>
          <hr className="bg-BrunswickGreen mt-4 mb-4 opacity-100" />
          <div className="flex justify-between">
            <p className="text-lg text-black">
              {listing.price} x {days} Days
            </p>
            <p className="text-lg text-black">{totalPrice} Euro</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg text-black">Cleaning Fee</p>
            <p className="text-lg text-black">{listing.cleaning_fee} Euro</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg text-black">WanderWise Fee</p>
            <p className="text-lg text-black">1 Euro</p>
          </div>
          <hr className="bg-BrunswickGreen mt-4 mb-4 opacity-100" />
          <div className="flex justify-between mb-3">
            <p className="text-lg text-black">Total</p>
            <p className="text-lg text-black">
              {totalPrice + listing.cleaning_fee + 1} Euro
            </p>
          </div>
        </div>
        <div className="flex justify-center w-full mt-4 mb-4 lg:w-8/12 lg:mx-auto">
          <button
            className="bg-BrunswickGreen text-white w-full p-2 rounded-xl"
            onClick={handleBookNowClick}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
