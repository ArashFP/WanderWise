import { Navbar } from "@/app/_components/navbar_mobile"
import { CircleCheck } from "lucide-react"

const failedPage = () => {
  return (
    <main className="w-full h-screen">
      <img className="w-full h-full object-cover" src="/fire.jpeg" alt="fire" />
      <img className="absolute right-16 top-24  w-2/3 " src="/Font_logo_Ljus.png" alt="Logo" />
      <CircleCheck className="absolute right-32 top-44 w-24 h-24 text-timberwolf fill-red-600" />
      <div className="absolute flex flex-col gap-3 px-7 top-72 text-center right-16 pt-3 pb-5 rounded-lg w-2/3 bg-slate-50 text-black opacity-80">
        <p>Payment failed!</p>
        <hr />
        <p>Unfortunately, your payment was not successful. This listing is probably already booked for the duration of your wanted stay.</p>
      </div>
      <Navbar/>
    </main>
  )
}
export default failedPage