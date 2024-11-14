import { useState } from 'react'
import { Check } from 'lucide-react'

export const CategoryDropDown = ({ selectedCategories, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const toggleCategory = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]
    onChange(updatedCategories)
  }

  const categories = ['Ocean', 'Island', 'Mountains', 'City', 'Countryside', 'Surfing', 'Forests']

  return (
    <div className="relative w-72 text-black">
      <input
        type="text"
        placeholder="Categories"
        className="w-full h-10 p-4 bg-fernGreen text-timberwolf placeholder:text-timberwolf rounded-xl"
        onClick={toggleDropdown}
        readOnly
        value={selectedCategories.join(', ')}
      />
      {showDropdown && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-xl mt-1 p-4 z-50">
          {categories.map((category) => (
            <div
              key={category}
              className="flex justify-between items-center mb-2 cursor-pointer"
              onClick={() => toggleCategory(category)}
            >
              <span>{category}</span>
              {selectedCategories.includes(category) && (
                <div className="border border-gray-300 p-1">
                  <Check className="text-iconColor" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}