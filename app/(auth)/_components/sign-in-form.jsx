"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '@/firebase/config';
import toast from 'react-hot-toast';

const formSchema = z.object({
  email: z.string().email({ message: "You need to enter a valid email."}),
  password: z.string().min(1, { message: "You need to enter a password."}),
});

const SignInForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Signed in successfully!");
    } catch (error) {
      toast.error("Error signing in: " + error.message);
    }
  };

  return (
    <form className="flex flex-col gap-3 px-2" onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <label className="text-timberwolf">Email:</label>
        <input className="rounded-xl w-full mt-2 py-1 px-2" type="email" {...form.register("email")} />
        {form.formState.errors.email && <p>{form.formState.errors.email.message}</p>}
      </div>
      <div>
        <label className="text-timberwolf">Password:</label>
        <input className="rounded-xl w-full mt-2 py-1 px-2" type="password" {...form.register("password")} />
        {form.formState.errors.password && <p>{form.formState.errors.password.message}</p>}
      </div>
      <button className="rounded-xl bg-fernGreen text-timberwolf border-timberwolf border-2 py-1 w-full mt-2" type="submit">Log in</button>
    </form>
  );
};

export default SignInForm;