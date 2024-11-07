"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore"
import { auth, db } from '@/firebase/config';
import toast from 'react-hot-toast';

const formSchema = z.object({
  email: z.string().email({ message: "You need to enter a valid email."}),
  firstName: z.string().min(1, { message: "You need to enter a first name."}),
  lastName: z.string().min(1, { message: "You need to enter a last name."}),
  password: z.string().min(8, { message: "The password must be at least 8 characters long."}),
  confirmPassword: z.string(),
}).refine(values => {
    return values.password === values.confirmPassword
}, {
    message: 'Passwords must match',
    path: ['confirmPassword']
});

const SignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      toast.success("User registered successfully!");
    } catch (error) {
      toast.error("Error registering user: " + error.message);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="">
        <label className="text-timberwolf">Email:</label>
        <input className="rounded-xl w-full mt-2 py-1 px-2" type="email" {...form.register("email")} />
        {form.formState.errors.email && <p>{form.formState.errors.email.message}</p>}
      </div>
      <div>
        <label className="text-timberwolf" >First Name:</label>
        <input className="rounded-xl w-full mt-2 py-1 px-2" type="text" {...form.register("firstName")} />
        {form.formState.errors.firstName && <p>{form.formState.errors.firstName.message}</p>}
      </div>
      <div>
        <label className="text-timberwolf">Last Name:</label>
        <input className="rounded-xl w-full mt-2 py-1 px-2" type="text" {...form.register("lastName")} />
        {form.formState.errors.lastName && <p>{form.formState.errors.lastName.message}</p>}
      </div>
      <div>
        <label className="text-timberwolf">Password:</label>
        <input className="rounded-xl w-full mt-2 py-1 px-2" type="password" {...form.register("password")} />
        {form.formState.errors.password && <p>{form.formState.errors.password.message}</p>}
      </div>
      <div>
        <label className="text-timberwolf">Confirm Password:</label>
        <input className="rounded-xl w-full mt-2 py-1 px-2" type="password" {...form.register("confirmPassword")} />
        {form.formState.errors.confirmPassword && <p>{form.formState.errors.confirmPassword.message}</p>}
      </div>
      <button className="rounded-xl bg-fernGreen text-timberwolf border-timberwolf border-2 py-1 w-full mt-2" type="submit">Register</button>
    </form>
  );
};

export default SignUpForm;