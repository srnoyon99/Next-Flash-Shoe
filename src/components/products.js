"use client"
import React from 'react'

import { Splide, SplideSlide } from '@splidejs/react-splide'

const Products = () => {
  const images = [
    { src: '/lethershoe.jpeg', alt: 'Image 1' },
    { src: '/snakers.jpeg', alt: 'Image 2' },
    { src: '/bag.jpeg', alt: 'Image 3' },
    { src: '/ledisbag.jpeg', alt: 'Image 4' },
    { src: '/ledisshoe.jpeg', alt: 'Image 1' },
    { src: '/belt.jpeg', alt: 'Image 2' },
    { src: '/wallet.jpeg', alt: 'Image 3' },
  ]

  const products = [
    { name: ' Lether Shoe ' },
    { name: ' Snakers ' },
    { name: ' Bag ' },
    { name: ' Ledies Bag ' },
    { name: ' Ledies Shoe ' },
    { name: ' Belt ' },
    { name: ' Wallet ' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="flex items-center justify-center ">
        <h2 className=" text-md md:text-2xl font-bold mb-4 ">Featured Categories</h2>
      </div>

      <Splide options={{
        perPage: 7,
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
          <SplideSlide className={'cursor-pointer  '} key={index}>
            {/* ///////////// SM/MD//////////// */}
            <div className=" flex flex-col bg-yellow-300/30 rounded-2xl items-center justify-center mb-2 overflow-hidden">
              <img className=" object-cover overflow-hidden " src={image.src} alt={image.alt} />
              <div className="text-center ml-2 border-0 border-black">
                <h3 className="text-sm lg:text-lg font-bold text-nowrap ">{products[index].name}</h3>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}

export default Products
