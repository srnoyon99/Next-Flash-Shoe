"use client"
import React from 'react'
import Image from 'next/image'
import discountedProductImage from '../../../public/discountproduct.webp'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { Heart } from 'lucide-react'
import Cummonbutton from '@/components/cummonbutton'
import Addtocardbutton from '@/components/addtocardbutton'

const page = () => {
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

  const items = products.map((product, idx) => ({
    ...product,
    image: images[idx] || images[0],
  }))

  return (
    <div className="min-h-screen  ">
      <Image src={discountedProductImage} alt="Discounted Product" width={1920} height={1080} className=" bg-cover overflow-hidden w-full h-auto" />
      <div className="container mx-auto">
        <div className=" inset-0 flex flex-col items-center justify-center bg-opacity-50">
          <div className="relative grid items-center justify-center gap-3 ">
            <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64  rounded-full blur-[170px] pointer-events-none" />
            <h3 className="text-center font-extrabold leading-5 text-transparent text-2xl lg:text-5xl text-nowrap [-webkit-text-stroke:1px_#0D542B] bg-clip-text  bg-red-500 mt-6" >
              FLASH SHOE
            </h3>
            <h3 className="text-2xl lg:text-5xl text-gray-800 text-center mt-0 lg:mt-5 font-bold leading-5 text-balance lg:text-nowrap bg-clip-text bg-red-500">
              Your one-stop destination for all your sneaker needs
            </h3>
          </div>
          <p className="text-center text-sm lg:text-lg text-gray-800 mt-2 lg:mt-6 max-w-full lg:max-w-180 pt-3">
            Every occasion deserves a different look. A stylish one for a movie date, a powerful one for a morning run and a casual one for a meetup with friends. Sneaker Studio at Bata is where you can ace them all.
          </p>
        </div>

        {/* /////////////Man Sneakers/////////////// */}
        <div className=' mt-10 '>
        <div className=" flex items-center justify-between ">
          <div className=' flex items-center'>
            <div className="h-[30px] w-[20px] bg-red-700 mb-4 rounded-2xl " />
            <h2 className=" text-2xl font-bold mb-4 ml-2 ">Man Sneakers</h2>
          </div>
          <button className=' px-2 py-1 bg-green-800 rounded-3xl cursor-pointer text-amber-50 font-bold mb-2 ' >
            All
          </button>
        </div>

        <Splide options={{
          type: 'loop',
          perPage: 5,
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
            <SplideSlide className={'cursor-pointer border-1 rounded-3xl border-gray-400/20 min-h-fit shadow-2xs '} key={index}>
              <div className="  rounded-3xl grid-rows-1 items-center justify-center">
                <img className=" w-full h-full lg:w-full lg:h-full object-cover rounded-t-3xl " src={item.image.src} alt={item.image.alt} />
                <Cummonbutton />
                <Heart className='absolute hidden lg:block top-7 right-5' color="#000000" size={30} strokeWidth={2} />
                <Heart className='absolute lg:hidden top-7 right-5' color="#000000" size={25} strokeWidth={2} />
                <Addtocardbutton/>
                <div className="text-start pl-5 border-t-[1px] border-gray-400 py-2">
                  <h3 className="text-lg font-bold break-all ">{item.name || 'Product'}</h3>
                  <p className="text-red-500">TK.{item.price || ''}</p>
                  <p className="text-gray-800 dark:text-white">Color: {item.color} | {item.color1} | {item.color2}</p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

        {/* /////////////Woman Sneakers/////////////// */}
        <div className=' mt-10 '>
        <div className=" flex items-center justify-between ">
          <div className=' flex items-center'>
            <div className="h-[30px] w-[20px] bg-red-700 mb-4 rounded-2xl " />
            <h2 className=" text-2xl font-bold mb-4 ml-2 ">Women Sneakers</h2>
          </div>
          <button className=' px-2 py-1 bg-green-800 rounded-3xl cursor-pointer text-amber-50 font-bold mb-2 ' >
            All
          </button>
        </div>

        <Splide options={{
          type: 'loop',
          perPage: 5,
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
            <SplideSlide className={'cursor-pointer border-1 rounded-3xl border-gray-400/20 min-h-fit shadow-2xs '} key={index}>
              <div className="  rounded-3xl grid-rows-1 items-center justify-center">
                <img className=" w-full h-full lg:w-full lg:h-full object-cover rounded-t-3xl " src={item.image.src} alt={item.image.alt} />
                <Cummonbutton />
                <Heart className='absolute hidden lg:block top-7 right-5' color="#000000" size={30} strokeWidth={2} />
                <Heart className='absolute lg:hidden top-7 right-5' color="#000000" size={25} strokeWidth={2} />
                <Addtocardbutton/>
                <div className="text-start pl-5 border-t-[1px] border-gray-400 py-2">
                  <h3 className="text-lg font-bold break-all ">{item.name || 'Product'}</h3>
                  <p className="text-red-500">TK.{item.price || ''}</p>
                  <p className="text-gray-800 dark:text-white">Color: {item.color} | {item.color1} | {item.color2}</p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

        {/* /////////////Kid's Sneakers/////////////// */}
        <div className=' mt-10 '>
        <div className=" flex items-center justify-between ">
          <div className=' flex items-center'>
            <div className="h-[30px] w-[20px] bg-red-700 mb-4 rounded-2xl " />
            <h2 className=" text-2xl font-bold mb-4 ml-2 ">Kids Sneakers</h2>
          </div>
          <button className=' px-2 py-1 bg-green-800 rounded-3xl cursor-pointer text-amber-50 font-bold mb-2 ' >
            All
          </button>
        </div>

        <Splide options={{
          type: 'loop',
          perPage: 5,
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
            <SplideSlide className={'cursor-pointer border-1 rounded-3xl border-gray-400/20 min-h-fit shadow-2xs '} key={index}>
              <div className="  rounded-3xl grid-rows-1 items-center justify-center">
                <img className=" w-full h-full lg:w-full lg:h-full object-cover rounded-t-3xl " src={item.image.src} alt={item.image.alt} />
                <Cummonbutton />
                <Heart className='absolute hidden lg:block top-7 right-5' color="#000000" size={30} strokeWidth={2} />
                <Heart className='absolute lg:hidden top-7 right-5' color="#000000" size={25} strokeWidth={2} />
                <Addtocardbutton/>
                <div className="text-start pl-5 border-t-[1px] border-gray-400 py-2">
                  <h3 className="text-lg font-bold break-all ">{item.name || 'Product'}</h3>
                  <p className="text-red-500">TK.{item.price || ''}</p>
                  <p className="text-gray-800 dark:text-white">Color: {item.color} | {item.color1} | {item.color2}</p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      </div>
    </div>
  )
}

export default page