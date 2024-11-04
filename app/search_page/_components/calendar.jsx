import { useState, useEffect } from 'react'

export const Calendar = () => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(null)
  const [currentYear, setCurrentYear] = useState(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    const today = new Date()
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
    setIsClient(true)
  }, [])

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Europe/Stockholm',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date)
  }

  const handleDateChange = (date) => {
    const formattedDate = formatDate(new Date(date))
    if (!startDate || (startDate && endDate)) {
      setStartDate(formattedDate)
      setEndDate(null)
    } else if (new Date(date) < new Date(startDate)) {
      setStartDate(formattedDate)
      setEndDate(null)
    } else if (new Date(date) > new Date(endDate)) {
      setEndDate(formattedDate)
    } else {
      setEndDate(formattedDate)
    }
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handleToday = () => {
    const today = new Date()
    setStartDate(formatDate(today))
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
  }

  const renderCalendar = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
    const today = new Date()

    const calendarDays = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<td key={`empty-${i}`} className="p-1"></td>)
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const formattedDate = formatDate(date)
      const isToday = today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear
      const isSelected = formattedDate === startDate || formattedDate === endDate
      const isInRange = startDate && endDate && new Date(formattedDate) > new Date(startDate) && new Date(formattedDate) < new Date(endDate)
      const isAfterToday = new Date(formattedDate) > today

      calendarDays.push(
        <td key={day} className="p-1 text-center cursor-pointer">
          <div
            className={`w-8 h-8 flex items-center justify-center ${isToday ? 'bg-fernGreen text-timberwolf rounded-full' : ''} ${isSelected || isInRange ? 'bg-[#F04D23] text-timberwolf rounded-full' : ''}`}
            onClick={() => isAfterToday && handleDateChange(date)}
          >
            {day}
          </div>
        </td>
      )
    }

    const rows = []
    for (let i = 0; i < calendarDays.length; i += 7) {
      rows.push(<tr key={`row-${i}`}>{calendarDays.slice(i, i + 7)}</tr>)
    }

    return (
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th colSpan={7} className="p-3 text-center font-semibold">
              <button onClick={handlePrevMonth} className="px-2">&lt;</button>
              {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
              <button onClick={handleNextMonth} className="px-2">&gt;</button>
            </th>
          </tr>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day} className="p-1 text-gray-500 opacity-60">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

  if (!isClient) {
    return null
  }

  const inputValue = startDate
    ? endDate
      ? `From ${startDate} to ${endDate}`
      : `From ${startDate}`
    : ''

  return (
    <>
      <div className="relative w-72">
        <input
          type="text"
          placeholder="Date"
          className="w-full h-10 p-4 bg-fernGreen text-timberwolf placeholder:text-timberwolf rounded-xl"
          readOnly
          value={inputValue}
        />
        <div className="absolute top-full left-0 w-full bg-slate-50 shadow-2xl rounded-xl mt-4 p-2 z-50">
          {renderCalendar()}
          <button onClick={handleToday} className="w-full mt-2 p-2 bg-fernGreen text-timberwolf rounded-full">
            Today
          </button>
        </div>
      </div>
    </>
  )
}