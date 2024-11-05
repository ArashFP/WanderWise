import { useState } from 'react'

export const PriceSliderDropdown = ({onChange}) => {
  const [showSlider, setShowSlider] = useState(false)
  const [sliderValue, setSliderValue] = useState(1)

  const handleSliderChange = (event) => {
    const newValue = event.target.value
    setSliderValue(newValue)
    onChange(newValue)
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
        value={`Price: ${sliderValue} Euro`}
      />
      {showSlider && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-xl mt-1 p-4 z-50">
          <label htmlFor="price-slider" className="block text-sm font-medium text-gray-700">
            Price: {sliderValue} Euro
          </label>
          <input
            id="price-slider"
            type="range"
            min="1"
            max="30"
            value={sliderValue}
            onChange={handleSliderChange}
            className="w-full mt-2"
          />
        </div>
      )}
    </div>
  )
}