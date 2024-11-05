'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CircleArrowLeft } from "lucide-react"
import { GuestDropDownMenu } from "./_components/guestDropDownMenu"
import { Navbar } from "../_components/navbar_mobile"
import { CategoryDropDown } from "./_components/categoryDropDown"
import { PriceSliderDropdown } from "./_components/priceSliderDropdown"
import { Calendar } from "./_components/calendar"

const searchpage = () => {
  const [destination, setDestination] = useState('')
  const [guests, setGuests] = useState({ adults: 1, children: 0 })
  const [selectedCategories, setSelectedCategories] = useState([])
  const [price, setPrice] = useState(1)
  const [dates, setDates] = useState({ startDate: null, endDate: null })

  const router = useRouter()

  const handleDestinationChange = (e) => {
    setDestination(e.target.value)
  }

  const handleGuestsChange = (adults, children) => {
    setGuests({ adults, children })
  }

  const handleCategoriesChange = (categories) => {
    setSelectedCategories(categories)
  }

  const handlePriceChange = (newPrice) => {
    setPrice(newPrice)
    console.log(newPrice + "new price")
    console.log(price)
  }

  const handleDatesChange = (startDate, endDate) => {
    setDates({ startDate, endDate })
  }

  const handleSearch = () => {
    const query = new URLSearchParams({
      destination,
      adults: guests.adults,
      children: guests.children,
      categories: selectedCategories.join(','),
      price,
      startDate: dates.startDate,
      endDate: dates.endDate
    }).toString()

    router.push(`/search_result?${query}`)
  }

  return (
    <main className="bg-timberwolf h-screen pt-7 relative">
      <div className="flex items-center justify-between">
        <CircleArrowLeft className="ml-3 h-11 w-11 absolute left-0 text-iconColor" />
        <img src="/logo.png" alt="hej" className="w-28 h-14 mx-auto" />
      </div>
      <div className="flex flex-col justify-center items-center mt-5 gap-3">
        <input
          type="text"
          placeholder="Destination?"
          className="w-72 h-10 p-4 bg-fernGreen text-timberwolf placeholder:text-timberwolf rounded-xl"
          value={destination}
          onChange={handleDestinationChange}
        />
        <GuestDropDownMenu guests={guests} onChange={handleGuestsChange} />
        <CategoryDropDown selectedCategories={selectedCategories} onChange={handleCategoriesChange} />
        <PriceSliderDropdown price={price} onChange={handlePriceChange} />
        <Calendar dates={dates} onChange={handleDatesChange} />
        <button onClick={handleSearch} className="w-72 absolute bottom-28 mt-2 p-2 bg-BrunswickGreen text-timberwolf rounded-xl">
          Search
        </button>
      </div>
      <Navbar />
    </main>
  )
}

export default searchpage