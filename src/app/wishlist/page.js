"use client"
import React from 'react'
import { ProductCarousel, ProductCard, productCarouselOptions } from '@/components/ui/ProductCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PrevNextPagination } from '@/components/ui/PrevNextPagination'
import { shoeImages, products, withImages } from '@/data/products'

const page = () => {
  const items = withImages(products.slice(0, 4), shoeImages)

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeading
        title="Your Fevriout item "
        wrapperClassName="container flex items-center justify-between "
        contentClassName=" flex items-center justify-center "
        titleClassName=" text-lg lg:text-2xl font-bold mb-4 ml-2 "
      />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div className={'cursor-pointer border-1 rounded-3xl border-gray-400/20 min-h-fit shadow-2xs '} key={index}>
            <ProductCard item={item} grid />
          </div>
        ))}
      </div>

      <PrevNextPagination />

      <div className=" pt-12">
        <SectionHeading title="You May Also Like" wrapperClassName=" flex items-center " pillClassName="h-[30px] w-[20px] bg-red-700 mb-4 rounded-3xl " />
        <ProductCarousel
          items={items}
          mobileHeartSize={20}
          options={productCarouselOptions(6, { 640: { perPage: 3 }, 1024: { perPage: 3 } })}
        />
      </div>
    </div>
  )
}

export default page
