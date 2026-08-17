"use client"
import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { Heart } from 'lucide-react'

const page = () => {
  const images = [
    { src: '/img2.webp', alt: 'Image 1' },
    { src: '/img3.webp', alt: 'Image 2' },
    { src: '/img4.webp', alt: 'Image 3' },
    { src: '/img5.webp', alt: 'Image 4' },
    { src: '/img6.webp', alt: 'Image 5' },
    { src: '/shoe1.avif', alt: 'Image 1' },
    { src: '/shoe2.avif', alt: 'Image 2' },
    { src: '/shoe3.avif', alt: 'Image 3' },
    { src: '/shoe4.webp', alt: 'Image 4' },
    { src: '/shoe5.avif', alt: 'Image 5' },
    { src: '/shoe6.avif', alt: 'Image 6' },
    { src: '/shoe7.avif', alt: 'Image 7' },
    { src: '/shoe8.avif', alt: 'Image 8' },
    { src: '/shoe9.avif', alt: 'Image 9' },
    { src: '/shoe10.avif', alt: 'Image 10' },
  ]

  const products = [
    { name: 'Lides Bag' },
    { name: 'Money Bag' },
    { name: 'Backpack' },
    { name: 'Belt' },
    { name: 'Shoes Polish' },
  ]

  const producstname = [
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '40', size1: '42', size2: '38' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '42', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '38', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: 'M', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '40', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '41', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '38', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: 'M', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '40', size1: '42', size2: '38' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '42', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '38', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: 'M', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '40', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '41', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '38', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: 'M', size1: '44', size2: '46' },
  ]

  const selectedProducts = products.map((product, index) => ({
    ...product,
    image: images[index % images.length] || images[0],
  }))

  const productImages = producstname.map((product, index) => ({
    ...product,
    image: images[index % images.length] || images[0],
  }))

  return (
    <div className="container mx-auto px-4 py-8">

      {/* //////////////////Selected Your Products////////////////////// */}
      <div>
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
      {/* //////////////////Selected Your Products////////////////////// */}

      {/* //////////////////ALL Products////////////////////// */}
      <div className=" pt-8 ">
         <div className="flex items-center ">
          <div className="h-[20px] w-[20px] bg-red-700 mb-4 rounded-3xl " />
          <h2 className=" text-lg lg:text-2xl font-bold mb-4 ml-2 ">All Products</h2>
        </div>

       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 ">
        {productImages.map((item, index) => (
          <div className={'cursor-pointer border-1 rounded-3xl border-gray-400/20 min-h-fit shadow-2xs '} key={index}>
            <div className=" relative items-center justify-center rounded-3xl overflow-hidden">
              <img className=" w-full h-full lg:w-full lg:h-full object-cover rounded-t-3xl " src={item.image.src} alt={item.image.alt} />
              <Heart className=' absolute hidden lg:block top-7 right-5' color="#000000" size={30} strokeWidth={2} />
              <Heart className=' absolute lg:hidden top-7 right-5' color="#000000" size={25} strokeWidth={2} />
              <p className="text-gray-800 dark:text-white text-center "> {item.size} | {item.size1} | {item.size2}</p>
              <button className="bg-gray-900 dark:bg-gray-400 text-white w-full py-2 h-full mt-2 cursor-pointer hover:bg-red-800 transition duration-300">Add to Cart</button>
              <div className="text-start pl-5 border-t-[1px] border-gray-400 py-2">
                <h3 className="text-lg font-bold break-all ">{item.name || 'Product'}</h3>
                <p className="text-red-500">TK.{item.price || ''}</p>
                <p className="text-gray-800 dark:text-white">Color: {item.color} | {item.color1} | {item.color2}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button className="bg-gray-900 dark:bg-gray-400 text-white dark:text-black py-1 px-4 rounded-lg hover:bg-red-700 transition duration-300 cursor-pointer"> Prev</button>
        <button className="bg-gray-900 dark:bg-gray-400 text-white dark:text-black py-1 px-4 rounded-lg hover:bg-green-500 transition duration-300 cursor-pointer"> Next</button>
      </div>
      </div>
      {/* //////////////////ALL Products////////////////////// */}
    </div>
  )
}

export default page
