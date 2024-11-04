'use client'
import { CircleArrowLeft } from "lucide-react"
import { GuestDropDownMenu } from "./_components/guestDropDownMenu"
import { Navbar } from "../_components/navbar_mobile"

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
      </div>
      <Navbar />
    </main>
  )
}
export default searchpage