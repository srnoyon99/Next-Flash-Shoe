"use client"
import React from 'react'
import { ProductCarousel, productCarouselOptions } from '@/components/ui/ProductCard'
import { HeroBanner } from '@/components/ui/HeroBanner'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { shoeImages, products, withImages } from '@/data/products'

const page = () => {
  const items = withImages(products, shoeImages)
  const options = productCarouselOptions(4, { 640: { perPage: 2 }, 1024: { perPage: 3 } })
  const sections = ["Man Sneakers", "Woman Sneakers", "Kid's Sneakers"]

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroBanner
        subtitle="sneaker"
        titleClassName="text-center font-extrabold leading-10 text-transparent dark:text-white text-2xl lg:text-5xl text-nowrap [-webkit-text-stroke:1px_#0D542B] bg-clip-text  bg-red-500 mt-6"
        subtitleClassName="text-2xl lg:text-5xl text-gray-800 dark:text-gray-200 text-center mt-0 lg:mt-5 font-bold leading-5 text-balance lg:text-nowrap bg-clip-text bg-red-500"
      >
        <p className="text-center text-sm lg:text-lg text-gray-800 dark:text-gray-100 mt-2 lg:mt-6 max-w-full lg:max-w-180 pt-3">
          Every occasion deserves a different look. A stylish one for a movie date, a powerful one for a morning run and a casual one for a meetup with friends. Sneaker Studio at Bata is where you can ace them all.
        </p>
      </HeroBanner>

      {sections.map((title) => (
        <div key={title}>
          <SectionHeading
            title={title}
            wrapperClassName="container flex items-center pt-8 "
            pillClassName=" h-[25px] lg:h-[40px] w-[20px] lg:w-[20px] bg-red-700 mb-4 rounded-3xl "
            titleClassName=" text-sm lg:text-2xl font-bold mb-4 ml-2 "
          />
          <ProductCarousel items={items} options={options} slideClassName={'cursor-pointer  border-1 rounded-3xl border-gray-400/20 min-h-fit shadow-2xs '} />
        </div>
      ))}
    </div>
  )
}

export default page
