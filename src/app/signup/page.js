'use client';
import Link from "next/link";
import logo from "../../../images/icon_light.png"
import Image from "next/image";
import { MoveLeft } from "lucide-react";

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
                              <div>
                                   <label htmlFor="fname" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Full
                                        Name</label>
                                   <input type="text" id="fname" name="fname" placeholder="Your Name" required
                                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700" />
                              </div>
                              <div>
                                   <label htmlFor="lname" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Address</label>
                                   <input type="text" id="lname" name="lname" placeholder="Give Your Address" required
                                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700" />
                              </div>
                              <div>
                                   <label htmlFor="email"
                                        className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Email</label>
                                   <input type="email" id="email" name="email" placeholder="you@gmail.com" required
                                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700" />
                              </div>
                              <div>
                                   <label htmlFor="mobile"
                                        className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Mobile Number</label>
                                   <input type="tel" id="mobile" name="mobile" placeholder="017*******" required
                                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700" />
                              </div>
                              <div>
                                   <label htmlFor="password"
                                        className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Password</label>
                                   <input type="password" id="password" name="password" placeholder="••••••••" required
                                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700" />
                              </div>
                              <div>
                                   <label htmlFor="cpassword"
                                        className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Confirm
                                        Password</label>
                                   <input type="password" id="cpassword" name="cpassword" placeholder="••••••••" required
                                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700" />
                              </div>
                              <div className="flex items-start flex-wrap gap-2">
                                   <label className="flex items-center group has-[input:checked]:text-slate-900">
                                        <input id="tmc" name="tmc" type="checkbox" required className="sr-only" />
                                        {/* Custom box  */}
                                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 dark:outline-neutral-700
                              bg-white dark:bg-neutral-800
                              group-has-[input:checked]:bg-blue-600
                              group-has-[input:checked]:outline-blue-600
                              group-focus-within:outline-2
                              group-focus-within:outline-blue-600" aria-hidden="true">
                                             {/* Checkmark  */}
                                             <svg className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100" viewBox="0 0 12 10"
                                                  fill="none" stroke="currentColor" strokeWidth="2">
                                                  <path d="M1 5l3 3 7-7" />
                                             </svg>
                                        </span>
                                        <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">
                                             I accept the
                                        </span>
                                   </label>

                                   <Link href="/terms"
                                        className="ml-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                                        Terms and Conditions
                                   </Link>
                              </div>
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
