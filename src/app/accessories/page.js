"use client"
import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { ProductCard, productCarouselOptions } from '@/components/ui/ProductCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PrevNextPagination } from '@/components/ui/PrevNextPagination'
import { categoryImages, shoeImages, products as sharedProducts, withImages } from '@/data/products'

const page = () => {
  const images = [...categoryImages.slice(0, 5), ...shoeImages]
  const products = [
    { name: 'Lides Bag' },
    { name: 'Money Bag' },
    { name: 'Backpack' },
    { name: 'Belt' },
    { name: 'Shoes Polish' },
  ]
  const producstname = [
    ...sharedProducts,
    ...sharedProducts.slice(2, 4),
    ...sharedProducts,
    ...sharedProducts.slice(2, 4),
  ]
  const selectedProducts = withImages(products, images, { wrap: true })
  const productImages = withImages(producstname, images, { wrap: true })

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <Splide options={productCarouselOptions(4, { 640: { perPage: 3 }, 768: { perPage: 4 } })}>
          {selectedProducts.map((product, index) => (
            <SplideSlide className={'cursor-pointer pt-6 '} key={index}>
              <div className=" bg-yellow-300/50 rounded-2xl grid-rows-1 items-center justify-center mb-2">
                <img className=" w-full h-full lg:w-full lg:h-full object-cover " src={product.image.src} alt={product.image.alt} />
                <div className="text-center ml-2 border-0 border-black">
                  <h3 className="text-sm lg:text-lg font-bold text-nowrap ">{product.name}</h3>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      <div className=" pt-8 ">
        <SectionHeading
          title="All Products"
          wrapperClassName="flex items-center "
          titleClassName=" text-lg lg:text-2xl font-bold mb-4 ml-2 "
        />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 ">
          {productImages.map((item, index) => (
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
