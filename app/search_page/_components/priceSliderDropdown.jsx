import { useState } from 'react'

export const PriceSliderDropdown = () => {
  const [price, setPrice] = useState(1)
  const [showSlider, setShowSlider] = useState(false)

  const handlePriceChange = (event) => {
    setPrice(event.target.value)
  }

  const toggleSlider = () => {
    setShowSlider(!showSlider)
  }

  return (
    <div className="relative w-72">
      <input
        type="text"
        placeholder="Price"
        className="w-full h-10 p-4 bg-fernGreen text-timberwolf placeholder:text-timberwolf rounded-xl"
        onClick={toggleSlider}
        readOnly
        value={`Price: ${price} Euro`}
      />
      {showSlider && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-xl mt-1 p-4 z-50">
          <label htmlFor="price-slider" className="block text-sm font-medium text-gray-700">
            Price: {price} Euro
          </label>
          <input
            id="price-slider"
            type="range"
            min="1"
            max="30"
            value={price}
            onChange={handlePriceChange}
            className="w-full mt-2"
          />
        </div>
      )}
    </div>
  )
}