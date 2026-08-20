'use client';
import Link from "next/link";
import logo from "../../../images/icon_light.png"
import Image from "next/image";
import { MoveLeft } from "lucide-react";
import { TextField, Checkbox } from '@/components/ui/AuthFields';

export default function SignupPage() {
     return (
          <div>
               <div className="w-full max-w-lg mx-auto px-5 sm:max-w-4xl mt-9">
                    <div className="mb-12">
                         <Link href="/"><Image src={logo} alt="logo" className="w-20 min-h-17 rotate-10" />
                         </Link>
                         <p className="text-slate-600 text-base mt-6 dark:text-slate-400">Create your account and get started</p>
                    </div>

                    <form className="w-full">
                         <div className="grid sm:grid-cols-2 gap-6">
                              <TextField type="text" id="fname" name="fname" label={<>Full
                                   Name</>} placeholder="Your Name" requiredFirst />
                              <TextField type="text" id="lname" name="lname" label="Address" placeholder="Give Your Address" requiredFirst />
                              <TextField type="email" id="email" name="email" label="Email" placeholder="you@gmail.com" requiredFirst />
                              <TextField type="tel" id="mobile" name="mobile" label="Mobile Number" placeholder="017*******" requiredFirst />
                              <TextField type="password" id="password" name="password" label="Password" placeholder="••••••••" requiredFirst />
                              <TextField type="password" id="cpassword" name="cpassword" label={<>Confirm
                                   Password</>} placeholder="••••••••" requiredFirst />
                              <Checkbox id="tmc" name="tmc" label="I accept the" terms />
                         </div>

                         <div className=" flex items-center justify-between mt-6">
                              <button type="submit"
                                   className="py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                                   Create an account</button>

                                   <Link href="/signin"
                  className="text-blue-700 hover:underline ml-1 font-medium dark:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded flex items-center justify-center gap-1 "><MoveLeft color="#1100ff" /> Back</Link>
                         </div>
                    </form>
               </div>
          </div>
     );
}
