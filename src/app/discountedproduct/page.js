"use client"
import React from 'react'
import { ProductCard } from '@/components/ui/ProductCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PrevNextPagination } from '@/components/ui/PrevNextPagination'
import { shoeImages, products as sharedProducts, withImages } from '@/data/products'

const page = () => {
  const items = withImages([...sharedProducts, ...sharedProducts.slice(2, 4)], shoeImages)

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeading
        title="Your Discounted Products"
        wrapperClassName="container flex items-center justify-between "
        contentClassName=" flex items-center justify-center "
        titleClassName=" text-lg lg:text-2xl font-bold mb-4 ml-2 "
        action={
          <div className="dropdown dropdown-end">
            <button tabIndex={0} role="button" className=" py-1 px-3 rounded-2xl bg-green-700 border-1 border-black dark:border-amber-50 cursor-pointer  text-white m-1 mb-5">ITEM </button>
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
  )
}

export default page
