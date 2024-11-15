import Link from "next/link"
import SignUpForm from "../_components/sign-up-form"
import { Navbar } from "@/app/_components/navbar_mobile"
import { Footer } from "@/app/_components/footer"
import ProfileBar from "@/app/_components/profileBar"

function SignUpPage() {
  return (
    <main className="bg-timberwolf min-h-screen min-w-full relative">
      <div className="w-full absolute z-0 h-full">
        <img src="/boat.jpeg" alt="Bridge" className='w-full h-full object-cover rounded-lg' />
      </div>
      <div className="absolute right-0 w-24">
        <ProfileBar />
      </div>
      <div className="grid grid-cols-2 grid-rows-[1fr,auto]">
        <div className="w-full col-span-2 flex justify-center pb-10">
          <img src="/logo.png" alt="Logo" className='z-10 w-64 h-32' />
        </div>
        <div className="flex col-span-2 bg-timberwolf text-black min-w-full  justify-center">
          <div className="bg-BrunswickGreen flex flex-col w-72 h-auto px-4 rounded-lg shadow-lg shadow-black z-10 opacity-90">
            <h1 className="text-xl text-timberwolf font-semibold flex justify-center py-6">Register</h1>
            <SignUpForm />
            <p className="py-6 text-timberwolf text-center">Already a member? Sign in <Link className="underline" href='/sign-in'>here</Link></p>
          </div>
        </div>
      </div>
      <Navbar />
      <Footer />
    </main>
  )
}

export default SignUpPage
{/* <img src="/logo.png" alt="Logo" className='absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-22 h-10' /> */ }
