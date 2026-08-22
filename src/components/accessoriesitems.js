"use client"
import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'

const Accessoriesitems = () => {
       const images = [
    { src: '/img2.webp', alt: 'Image 1' },
    { src: '/img3.webp', alt: 'Image 2' },
    { src: '/img4.webp', alt: 'Image 3' },
    { src: '/img5.webp', alt: 'Image 4' },
    { src: '/img6.webp', alt: 'Image 5' },
     ]

  const products = [
    { name: 'Lides Bag' },
    { name: 'Money Bag' },
    { name: 'Backpack' },
    { name: 'Belt' },
    { name: 'Shoes Polish' },
  ]

    const selectedProducts = products.map((product, index) => ({
    ...product,
    image: images[index % images.length] || images[0],
  }))

  return (
    <div>
            {/* //////////////////Selected Your Products////////////////////// */}
      <div>
        <Splide options={{
          type: 'loop',
          perPage: 6,
          perMove: 1,
          gap: '1rem',
          breakpoints: {
            640: {
              perPage: 4,
            },
            768: {
              perPage: 5,
            },
          }
        }}>
          {selectedProducts.map((product, index) => (
            <SplideSlide className={'cursor-pointer pt-6 '} key={index}>
              <div className=" bg-yellow-300/50 rounded-2xl grid-rows-1 items-center justify-center mb-2 overflow-hidden">
                <img className=" w-full h-full lg:w-full lg:h-full object-cover " src={product.image.src} alt={product.image.alt} />
                <div className="text-center ml-2 border-0 border-black">
                  <h3 className="text-sm lg:text-lg font-bold text-nowrap ">{product.name}</h3>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
      {/* //////////////////Selected Your Products////////////////////// */}
    </div>
  )
}

export default Accessoriesitems
