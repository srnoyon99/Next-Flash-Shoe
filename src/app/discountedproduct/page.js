"use client"
import React from 'react'
import Image from 'next/image'
import discountedProductImage from '../../../public/discountproduct.webp'
import { ProductCard } from '@/components/ui/ProductCard'
import { HeroBanner } from '@/components/ui/HeroBanner'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PrevNextPagination } from '@/components/ui/PrevNextPagination'
import { shoeImages, products as sharedProducts, withImages } from '@/data/products'

const page = () => {
  const items = withImages([...sharedProducts, ...sharedProducts.slice(2, 4)], shoeImages)

  return (
    <div className="min-h-screen  ">
      <Image src={discountedProductImage} alt="Discounted Product" width={1920} height={1080} className=" bg-cover overflow-hidden w-full h-auto" />
      <div className="container mx-auto">
        <HeroBanner
          subtitle="sneaker"
          titleClassName="text-center font-extrabold leading-5 text-transparent text-2xl lg:text-5xl text-nowrap [-webkit-text-stroke:1px_#0D542B] bg-clip-text  bg-red-500 mt-6"
          subtitleClassName="text-2xl lg:text-5xl text-gray-800 text-center mt-0 lg:mt-5 font-bold leading-5 text-balance lg:text-nowrap bg-clip-text bg-red-500"
        >
          <p className="text-center text-sm lg:text-lg text-gray-800 mt-2 lg:mt-6 max-w-full lg:max-w-180 pt-3">
            Every occasion deserves a different look. A stylish one for a movie date, a powerful one for a morning run and a casual one for a meetup with friends. Sneaker Studio at Bata is where you can ace them all.
          </p>
        </HeroBanner>

        <SectionHeading
          title="Your Discounted Products"
          wrapperClassName="container flex items-center justify-between "
          contentClassName=" flex items-center justify-center "
          titleClassName=" text-lg lg:text-2xl font-bold mb-4 ml-2 "
          action={
            <div className="dropdown dropdown-end">
              <button tabIndex={0} role="button" className=" py-1 px-3 rounded-2xl bg-green-700 border-1 border-black cursor-pointer  text-white m-1 mb-5">ITEM </button>
              <ul tabIndex="-1" className="dropdown-content menu border-1 bg-gray-300 dark:bg-gray-700 text-black dark:text-white  rounded-box z-1 w-52 p-2 shadow-2xl">
                <li><a className=" bg-white dark:bg-gray-500 hover:bg-amber-200 dark:hover:bg-gray-600 border-1">Man</a></li>
                <li><a className=" bg-white dark:bg-gray-500 hover:bg-amber-200 dark:hover:bg-gray-600 border-1 mt-1">Woman</a></li>
                <li><a className=" bg-white dark:bg-gray-500 hover:bg-amber-200 dark:hover:bg-gray-600 border-1 mt-1">Kid&apos;s</a></li>
                <li><a className=" bg-white dark:bg-gray-500 hover:bg-amber-200 dark:hover:bg-gray-600 border-1 mt-1">Party Shoes</a></li>
                <li><a className=" bg-white dark:bg-gray-500 hover:bg-amber-200 dark:hover:bg-gray-600 border-1 mt-1">School Shoes</a></li>
                <li><a className=" bg-white dark:bg-gray-500 hover:bg-amber-200 dark:hover:bg-gray-600 border-1 mt-1">Collage Shoes</a></li>
              </ul>
            </div>
          }
        />

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div className={'cursor-pointer border-1 rounded-3xl border-gray-400/20 min-h-fit shadow-2xs '} key={index}>
              <ProductCard item={item} grid />
            </div>
          ))}
        </div>

        <PrevNextPagination />
      </div>
    </div>
  )
}

export default page
