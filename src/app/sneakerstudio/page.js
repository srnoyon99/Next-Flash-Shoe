"use client"
import React from 'react'
import Image from 'next/image'
import discountedProductImage from '../../../public/discountproduct.webp'
import Accessories from '@/components/accessories'

const page = () => {
  return (
    <div className="min-h-screen ">
      <div>
        <Image src={discountedProductImage} alt="Discounted Product" width={1920} height={1080} className=" bg-cover overflow-hidden w-full h-auto" />
        <div className=" inset-0 flex flex-col items-center justify-center bg-opacity-50">
          <div className="relative grid items-center justify-center gap-3 ">
            <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64  rounded-full blur-[170px] pointer-events-none" />
            <h3 className="text-center font-extrabold leading-5 text-transparent text-2xl lg:text-5xl text-nowrap [-webkit-text-stroke:1px_#0D542B] bg-clip-text  bg-red-500 mt-6" >
              FLASH SHOE
            </h3>
            <h3 className="text-2xl lg:text-5xl text-gray-800 text-center mt-0 lg:mt-5 font-bold leading-5 text-balance lg:text-nowrap bg-clip-text bg-red-500">
              Your one-stop destination for all your sneaker needs
            </h3>
          </div>
          <p className="text-center text-sm lg:text-lg text-gray-800 mt-2 lg:mt-6 max-w-full lg:max-w-180 pt-3">
            Every occasion deserves a different look. A stylish one for a movie date, a powerful one for a morning run and a casual one for a meetup with friends. Sneaker Studio at Bata is where you can ace them all.
          </p>
        </div>
      </div>

      <div>
        <Accessories/>
      </div>

    </div>
  )
}

export default page