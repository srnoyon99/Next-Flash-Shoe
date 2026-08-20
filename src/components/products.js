"use client"
import React from 'react'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import { categoryImages, categoryProducts } from '@/data/products'
import { productCarouselOptions } from '@/components/ui/ProductCard'
import { SectionHeading } from '@/components/ui/SectionHeading'

const Products = () => {
  return (
    <div className="container mx-auto px-4 py-8">

      <SectionHeading title="Products" wrapperClassName="flex items-center " pillClassName="h-[20px] w-[20px] bg-red-700 mb-4 rounded-3xl "/>

      <Splide options={productCarouselOptions(4, { 640: { perPage: 3 }, 768: { perPage: 4 } })}>
        {categoryImages.map((image, index) => (
          <SplideSlide className={'cursor-pointer pt-6 '} key={index}>
            <div className=" bg-yellow-300/50 rounded-2xl grid-rows-1 items-center justify-center mb-2">
            <img className=" w-full h-full lg:w-full lg:h-full object-cover " src={image.src} alt={image.alt} />
            <div className="text-center ml-2 border-0 border-black">
              <h3 className="text-sm lg:text-lg font-bold text-nowrap ">{categoryProducts[index].name}</h3>
            </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}

export default Products
