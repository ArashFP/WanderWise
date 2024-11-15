import Link from "next/link"
import { Navbar } from "@/app/_components/navbar_mobile"
import SignInForm from "../_components/sign-in-form"
import { Footer } from "@/app/_components/footer"
import ProfileBar from "@/app/_components/profileBar"

function SignUpPage() {
  return (
    <main className="bg-timberwolf min-h-screen min-w-full relative">
      <div className="absolute right-0 w-24">
        <ProfileBar />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <img src="/bike.jpeg" alt="Bike" className='w-full h-1/2 object-cover' />
        <img src="/logo.png" alt="Logo" className='absolute top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-14' />
      </div>
      <div className="flex bg-timberwolf text-black min-h-screen min-w-full items-center justify-center">
        <div className="bg-BrunswickGreen flex flex-col justify-center items-center w-72 h-auto px-4 rounded-lg shadow-lg shadow-black z-10 opacity-90">
          <h1 className="text-xl text-timberwolf font-semibold flex justify-center py-6">Sign In</h1>
          <SignInForm />
          <p className="py-6 text-timberwolf text-center">Not a member? Create an account <Link className="underline" href='/sign-up'>here</Link></p>
        </div>
      </div>
      <Navbar />
      <Footer />
    </main>
  )
}

export default SignUpPage