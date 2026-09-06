'use client'

import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import Addtocardbutton from '@/components/addtocardbutton'
import Wishlistheart from '@/components/Wishlistheart'

const Choosesneakers = ({ showSeeAll = true }) => {
  const [visibleProductCount, setVisibleProductCount] = useState(16)

    const getDiscountPercentage = (price, oldPrice) => {
    const currentPrice = Number.parseFloat(price.replace(/[^0-9.]/g, ''))
    const previousPrice = Number.parseFloat(oldPrice.replace(/[^0-9.]/g, ''))

    if (!previousPrice || currentPrice >= previousPrice) return 0

    return Math.round(((previousPrice - currentPrice) / previousPrice) * 100)
  }

  const images = [
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

  const sizeOptions = [
    ['40', '42', '38'],
    ['42', '44', '46'],
    ['38', '44', '46'],
    ['M', '44', '46'],
    ['40', '44', '46'],
    ['41', '44', '46'],
  ]

  const products = Array.from({ length: 48 }, (_, index) => {
    const [size, size1, size2] = sizeOptions[index % sizeOptions.length]

    return {
      name: 'shaker',
      price: '$1600',
      oldPrice: '$2500',
      size,
      size1,
      size2,
      image: images[index % images.length],
    }
  })

  const visibleProducts = products.slice(0, visibleProductCount)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className=' flex items-center justify-between'>
        <div className="container flex items-center ">
          <div className="h-[27px] w-[13px] bg-red-700 mb-4 rounded-3xl " />
          <h2 className=" text-2xl font-bold mb-4 ml-2 ">Choose Your Sneakers</h2>
        </div>

        {showSeeAll && (
          <div className=' flex items-center justify-center gap-1 cursor-pointer mb-4 '>
            <Link href={'/choosesneaker'} ><p className=' flex items-center gap-1 text-nowrap text-sm border-b-1 lg:text-2xl'>See All <MoveRight /></p> </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 overflow-hidden">
        {visibleProducts.map((item, index) => (
          <div className="cursor-pointer border-1 rounded-3xl border-gray-400/20 min-h-fit shadow-2xs" key={index}>
            <div className="relative items-center justify-center rounded-3xl overflow-hidden">
              <img className="w-full h-full object-cover rounded-t-3xl" src={item.image.src} alt={item.image.alt} />
              <span className="absolute top-3 left-3 text-white text-[10px]  font-poppins px-3 py-1 font-bold border-1 bg-red-700 rounded-3xl">
                -{getDiscountPercentage(item.price, item.oldPrice)}%
              </span>
              <Wishlistheart />
              <Addtocardbutton />
              <div className="text-start pl-5 border-t-[1px] border-gray-400 py-2">
                <h3 className="text-lg font-bold break-all">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-red-500">TK.{item.price || ''}</p>
                  <p className="text-gray-500 text-[13px] lg:text-sm line-through">TK.{item.oldPrice || ''}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleProductCount < products.length && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => setVisibleProductCount((count) => count + 16)}
            className="rounded-full border border-gray-900 dark:border-gray-400 px-4 py-2 font-semibold transition-colors hover:bg-gray-900 dark:bg-gray-800 hover:text-white dark:hover:text-white cursor-pointer"
          >
            Load More...
          </button>
        </div>
      )}
      </div>

  )
}

export default Choosesneakers
