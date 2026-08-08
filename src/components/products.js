"use client"
import React from 'react'

import { Splide, SplideSlide } from '@splidejs/react-splide'

const Products = () => {
  const images = [
    { src: '/img2.webp', alt: 'Image 1' },
    { src: '/img3.webp', alt: 'Image 2' },
    { src: '/img4.webp', alt: 'Image 3' },
    { src: '/img5.webp', alt: 'Image 4' },
    { src: '/img6.webp', alt: 'Image 5' },
    { src: '/img7.webp', alt: 'Image 6' },
  ]

  const products = [
    { name: 'MAN' },
    { name: 'WOMAN' },
    { name: 'KIDS' },
    { name: 'ACCESSORIES' },
    { name: 'SHOES' },
    { name: 'CLOTHING' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="flex items-center ">
        <div className="h-[20px] w-[20px] bg-red-700 mb-4 rounded-3xl "/>
        <h2 className=" text-2xl font-bold mb-4 ml-2 ">Products</h2>
      </div>

      <Splide options={{
        type: 'loop',
        perPage: 4,
        perMove: 1,
        gap: '1rem',
        breakpoints: {
          640: {
            perPage: 3,
          },
          768: {
            perPage: 4,
          },
        }
      }}>
        {images.map((image, index) => (
          <SplideSlide className={'cursor-pointer pt-6 '} key={index}>
            <div className=" bg-yellow-300/50 rounded-2xl grid-rows-1 items-center justify-center mb-2">
            <img className=" w-full h-full lg:w-full lg:h-full object-cover " src={image.src} alt={image.alt} />
            <div className="text-center ml-2 border-0 border-black">
              <h3 className="text-lg font-bold text-nowrap ">{products[index].name}</h3>
            </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}

export default Products
