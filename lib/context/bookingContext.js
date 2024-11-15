"use client";
import React, { createContext, useState } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState(0);
  const [days, setDays] = useState(0);

  return (
    <BookingContext.Provider
      value={{
        totalPrice,
        setTotalPrice,
        checkInDate,
        setCheckInDate,
        checkOutDate,
        setCheckOutDate,
        categories,
        setCategories,
        price,
        setPrice,
        days,
        setDays,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
