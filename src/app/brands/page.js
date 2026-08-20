"use client"
import React from 'react'
import { ProductCarousel, productCarouselOptions } from '@/components/ui/ProductCard'
import { HeroBanner } from '@/components/ui/HeroBanner'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { shoeImages, products, withImages } from '@/data/products'

const sections = ['Nike', 'Adites', 'Panda', 'Power']

const page = () => {
  const items = withImages(products, shoeImages)
  const options = productCarouselOptions(5, { 640: { perPage: 2 }, 1024: { perPage: 3 } })

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroBanner
        subtitle="Brands"
        className=" inset-0 flex flex-col items-center justify-center bg-opacity-50 mb-12 "
        titleClassName="text-center font-extrabold leading-5 text-transparent text-2xl lg:text-5xl text-nowrap [-webkit-text-stroke:1px_#0D542B] bg-clip-text  bg-red-500 mt-6"
        subtitleClassName="text-2xl lg:text-5xl text-gray-800 dark:text-amber-50 text-center mt-0 lg:mt-5 font-bold leading-5 text-balance lg:text-nowrap bg-clip-text bg-red-500"
      />

      {sections.map((title, index) => (
        <div className={index ? ' mt-10 ' : undefined} key={title}>
          <SectionHeading
            title={title}
            wrapperClassName=" flex items-center justify-between "
            contentClassName=" flex items-center"
            pillClassName={index ? "h-[30px] w-[20px] bg-red-700 mb-4 rounded-2xl " : "h-[30px] w-[20px] bg-red-700 mb-4 rounded-2xl flex items-center justify-center "}
            action={<button className=' px-2 py-1 bg-green-800 rounded-3xl cursor-pointer text-amber-50 font-bold mb-2 ' >All</button>}
          />
          <ProductCarousel items={items} options={options} />
        </div>
      ))}
    </div>
  )
}

export default page
