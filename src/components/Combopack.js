"use client"
import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { Fan, Heart, MoveRight } from 'lucide-react'
import Cummonbutton from './cummonbutton'
import Addtocardbutton from './addtocardbutton'

const Combopack = () => {

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

  const products = [
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '40', size1: '42', size2: '38' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '42', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '38', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: 'M', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '40', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '41', size1: '44', size2: '46' },
  ]

  // Pair products with images safely to avoid undefined accesses
  const items = products.map((product, idx) => ({
    ...product,
    image: images[idx] || images[0],
  }))

  return (
    <div className=' bg-gray-300 dark:bg-gray-800 rounded-2xl '>
    <div className="container mx-auto px-4 py-8">

      <div className=' flex items-center justify-between'>
      <div className="container flex items-center ">
        <div className=" grid items-center justify-center h-[24px] w-[24px] bg-red-700 mb-4 rounded-3xl animate-spin "><Fan fill='#000000' size={18} strokeWidth={1} /></div>
        <h2 className=" text-md lg:text-2xl text-black dark:text-white font-bold mb-4 ml-2 ">Exclusive Combo Deals</h2>
      </div>

      <div className=' flex items-center justify-center gap-1 cursor-pointer mb-4 '>
       <p className=' flex items-center gap-1 text-nowrap text-sm border-b-1 lg:text-2xl'>See All <MoveRight /></p> 
      </div>
      </div>

      <Splide options={{
        type: 'loop',
        perPage: 4,
        perMove: 1,
        gap: '1rem',
        breakpoints: {
          640: {
            perPage: 2,
          },
          1024: {
            perPage: 3,
          },
        },
      }}>

        {items.map((item, index) => (
          <SplideSlide className={'cursor-pointer border-1 rounded-3xl border-gray-400 min-h-fit shadow-2xs bg-white dark:bg-black '} key={index}>
            <div className="  rounded-3xl grid-rows-1 items-center justify-center">
              <img className=" w-full h-full lg:w-full lg:h-full object-cover rounded-t-3xl " src={item.image.src} alt={item.image.alt} />
              <Heart className='absolute hidden lg:block top-7 right-5' color="#000000" size={30} strokeWidth={2} />
               <Heart className='absolute lg:hidden top-7 right-5' color="#000000" size={25} strokeWidth={2} />
               <Addtocardbutton/>
              <div className="text-start pl-5 border-t-[1px] border-gray-400 py-2">
                <h3 className="text-lg font-bold break-all ">{item.name || 'Product'}</h3>
                <p className="text-red-500">TK.{item.price || ''}</p>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>

    </div>
    </div>
  )
}

export default Combopack