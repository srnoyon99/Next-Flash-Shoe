"use client"
import React from 'react'
import { ProductCarousel, productCarouselOptions } from '@/components/ui/ProductCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { shoeImages, products, withImages } from '@/data/products'

const Accessories = () => {

  const items = withImages(products, shoeImages)

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeading title="Accessories" pillClassName="h-[40px] w-[20px] bg-red-700 mb-4 rounded-3xl " />
      <ProductCarousel items={items} options={productCarouselOptions(4, { 640: { perPage: 2 }, 1024: { perPage: 3 } })} />

    </div>
  )
}

export default Accessories
