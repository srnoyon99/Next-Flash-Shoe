"use client"
import React from 'react'

import { Splide, SplideSlide } from '@splidejs/react-splide'

const Products = () => {
  const images = [
    { src: '/Man.webp', alt: 'Image 1' },
    { src: '/Woman.png', alt: 'Image 2' },
    { src: '/Kides.webp', alt: 'Image 3' },
    { src: '/Accessories.png', alt: 'Image 4' },
  ]

  const products = [
    { name: 'MAN' },
    { name: 'WOMAN' },
    { name: 'KIDS' },
    { name: 'ACCESSORIES' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="flex items-center justify-center ">
        <h2 className=" text-md md:text-2xl font-bold mb-4 ">Featured Categories</h2>
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
            {/* ///////////// SM/MD//////////// */}
            <div className=" lg:hidden flex flex-col bg-yellow-300/30 h-30 rounded-2xl items-center justify-center mb-2 overflow-hidden">
              <img className=" w-20 h-20 lg:w-20 lg:h-20 object-cover overflow-hidden " src={image.src} alt={image.alt} />
              <div className="text-center ml-2 border-0 border-black">
                <h3 className="text-sm lg:text-lg font-bold text-nowrap ">{products[index].name}</h3>
              </div>
            </div>
            {/* ///////////// SM/MD//////////// */}

            {/* /////////////LG//////////// */}
            <div className='hidden lg:block'>
              <div className=" flex bg-yellow-300/30 h-30 rounded-2xl items-center justify-center gap-8 mb-2 overflow-hidden">
                <img className=" w-20 h-20 lg:w-20 lg:h-20 object-cover overflow-hidden " src={image.src} alt={image.alt} />
                <div className="text-center ml-2 border-0 border-black">
                  <h3 className="text-sm lg:text-lg font-bold text-nowrap ">{products[index].name}</h3>
                </div>
              </div>
            </div>
            {/* /////////////LG//////////// */}


          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}

export default Products
