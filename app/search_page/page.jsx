'use client'
import { CircleArrowLeft } from "lucide-react"
import { GuestDropDownMenu } from "./_components/guestDropDownMenu"
import { Navbar } from "../_components/navbar_mobile"
import { CategoryDropDown } from "./_components/categoryDropDown"
import { PriceSliderDropdown } from "./_components/priceSliderDropdown"
import { Calendar } from "./_components/calendar"

const searchpage = () => {

  return (
    <main className="bg-timberwolf h-screen pt-7">
      <div className="flex items-center justify-between">
        <CircleArrowLeft className="ml-3 h-11 w-11 absolute left-0 text-iconColor" />
        <img src="/logo.png" alt="hej" className="w-28 h-14 mx-auto" />
      </div>
      <div className="flex flex-col justify-center items-center mt-5 gap-3">
        <input
          type="text"
          placeholder="Destination?"
          className="w-72 h-10 p-4 bg-fernGreen text-timberwolf placeholder:text-timberwolf rounded-xl"
        />
        <GuestDropDownMenu />
        <CategoryDropDown />
        <PriceSliderDropdown />
        <Calendar />
        <button className="w-72 absolute bottom-28 mt-2 p-2 bg-BrunswickGreen text-timberwolf rounded-xl">
          Search
        </button>
      </div>
      <Navbar />
    </main>
  )
}
export default searchpage