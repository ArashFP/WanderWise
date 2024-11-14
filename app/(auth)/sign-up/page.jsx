import Link from "next/link"
import SignUpForm from "../_components/sign-up-form"
import { Navbar } from "@/app/_components/navbar_mobile"

function SignUpPage() {
  return (
    <main className="bg-timberwolf min-h-screen min-w-full relative">
      <div className="absolute z-0 h-1/3">
        <img src="/boat.jpeg" alt="Bridge" className='w-full h-full object-cover rounded-lg' />
        <img src="/logo.png" alt="Logo" className='absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-22 h-10' />
      </div>
      <div className="flex bg-timberwolf text-black min-h-screen min-w-full items-center justify-center pt-20">
        <div className="bg-BrunswickGreen flex flex-col justify-center items-center w-72 h-auto px-4 rounded-lg shadow-lg shadow-black z-10 mt-10">
          <h1 className="text-xl text-timberwolf font-semibold flex justify-center py-6">Register</h1>
          <SignUpForm />
          <p className="py-6 text-timberwolf text-center">Already a member? Sign in <Link className="underline" href='/sign-in'>here</Link></p>
        </div>
      </div>
      <Navbar/>
    </main>
  )
}

export default SignUpPage