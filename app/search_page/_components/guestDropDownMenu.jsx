import { useState } from "react"


export const GuestDropDownMenu = () => {
  const [showGuestDropdown, setShowGuestDropdown] = useState(false)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)

  const toggleGuestDropdown = () => {
    setShowGuestDropdown(!showGuestDropdown)
  }

  const incrementAdults = () => setAdults(adults + 1)
  const decrementAdults = () => setAdults(adults > 0 ? adults - 1 : 0)

  const incrementChildren = () => setChildren(children + 1)
  const decrementChildren = () => setChildren(children > 0 ? children - 1 : 0)



  return (
    <div className="relative w-72 text-black">
      <input
        type="text"
        placeholder="Guests"
        className="w-full h-10 p-4 bg-fernGreen text-timberwolf placeholder:text-timberwolf rounded-xl"
        onClick={toggleGuestDropdown}
        readOnly
        value={`Guests ${adults} Adults, ${children} Children`}
      />
      {showGuestDropdown && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-xl mt-1 p-4 z-50">
          <div className="flex justify-between items-center mb-2">
            <span>Adults</span>
            <div className="flex items-center">
              <button onClick={decrementAdults} className="px-2 py-1 bg-gray-200 rounded">-</button>
              <span className="mx-2">{adults}</span>
              <button onClick={incrementAdults} className="px-2 py-1 bg-gray-200 rounded">+</button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Children</span>
            <div className="flex items-center">
              <button onClick={decrementChildren} className="px-2 py-1 bg-gray-200 rounded">-</button>
              <span className="mx-2">{children}</span>
              <button onClick={incrementChildren} className="px-2 py-1 bg-gray-200 rounded">+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}