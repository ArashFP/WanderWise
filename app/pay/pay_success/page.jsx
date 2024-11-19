import { Footer } from "@/app/_components/footer"
import { Navbar } from "@/app/_components/navbar_mobile"
import ProfileBar from "@/app/_components/profileBar"
import { CircleCheck } from "lucide-react"

const successPage = () => {
  return (
    <main className="w-full min-h-screen flex flex-col" style={{ background: 'url(https://images.pexels.com/photos/2033933/pexels-photo-2033933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1) no-repeat center center', backgroundSize: 'cover' }}>
      <div className="w-24 ml-auto">
        <ProfileBar />
      </div>      
      <div className="w-2/3 mx-auto pt-16 grid grid-cols-2 grid-rows-[1fr,1fr,auto] gap-4">
        <div className="flex justify-center col-span-2">
          <img className="" src="/Font_logo_Ljus.png" alt="Logo" />
        </div>
        <div className="col-span-2 mx-auto justify-center items-center inline-flex">
          <CircleCheck className="w-full h-2/3 text-timberwolf fill-fernGreen" />
        </div>
        <div className="text-center col-span-2 bg-gray-500 rounded-lg border-2 border-white">
          <p className="p-5">Payment successful!</p>
          <p className="pb-5 px-5">Thank you for your purchase! Your adventure is just around the corner! A confirmation has been sent to your email with details of your stay.</p>
        </div>
      </div>
      <Navbar/>
      <Footer/>
    </main>
  )
}
export default successPage

{/* <img className="absolute right-16 top-24  w-2/3 " src="/Font_logo_Ljus.png" alt="Logo" />
<CircleCheck className="absolute right-32 top-44 w-24 h-24 text-timberwolf fill-fernGreen" />
<div className="absolute flex flex-col gap-3 px-7 top-72 text-center right-16 pt-3 pb-5 rounded-lg w-2/3 bg-slate-50 text-black opacity-80">
  <p>Payment successful!</p>
  <hr />
  <p>Thank you for your purchase! Your adventure is just around the corner! A confirmation has been sent to your email with details of your stay.</p>
</div> */}