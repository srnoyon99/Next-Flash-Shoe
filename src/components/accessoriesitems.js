"use client"
import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'

const Accessoriesitems = () => {
       const images = [
    { src: '/bag.jpeg', alt: 'Image 3' },
    { src: '/ledisbag.jpeg', alt: 'Image 4' },
    { src: '/belt.jpeg', alt: 'Image 2' },
    { src: '/wallet.jpeg', alt: 'Image 3' },
    { src: '/accessories.jpeg', alt: 'Image 3' },
     ]

  const products = [
    { name: ' Bag ' },
    { name: ' Ledies Bag ' },
    { name: ' Belt ' },
    { name: ' Wallet ' },
    { name: ' Accessories ' },
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
          perPage: 5,
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
