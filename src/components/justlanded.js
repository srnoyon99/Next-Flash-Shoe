"use client"
import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { ProductCarousel, productCarouselOptions } from '@/components/ui/ProductCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { shoeImages, products, withImages } from '@/data/products'

const JustLanded = () => {

     const sliderOptions = [
          { name: 'Sneakers' },
          { name: 'Party Shoes' },
          { name: 'Casual Shoes' },
          { name: 'Formal Shoes' },
          { name: 'Leather Items' },
          { name: 'Sports Shoes' },
          { name: 'Slippers' },
          { name: 'Sandals' },
     ]

     const items = withImages(products, shoeImages)

     return (
          <div className="container mx-auto px-4 py-8">
               <SectionHeading title="Just Landed" pillClassName="h-[40px] w-[20px] bg-red-700 mb-4 rounded-3xl " />
               <div className="mb-7">
                    <Splide options={productCarouselOptions(7, { 640: { perPage: 3 }, 1024: { perPage: 4 } })}>
                         {sliderOptions.map((option, index) => (
                              <SplideSlide className={' border-1 rounded-3xl border-gray-400/50 cursor-pointer mb-7 '} key={index}>
                                   <h3 className=" text-4 lg:text-5 md:text-xl font-bold text-center py-2  ">{option.name}</h3>
                              </SplideSlide>
                         ))}
                    </Splide>
               </div>


               <ProductCarousel items={items} options={productCarouselOptions(4, { 640: { perPage: 2 }, 1024: { perPage: 3 } })} />

          </div>
     )
}

export default JustLanded
