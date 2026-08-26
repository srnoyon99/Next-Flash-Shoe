"use client"
import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { MoveRight } from 'lucide-react'
import Addtocardbutton from '@/components/addtocardbutton'
import Image from 'next/image'
import Nike from '../../../images/nikelogo.png'
import Adidas from '../../../images/adidaslogo.png'
import Panda from '../../../images/pandalogo.png'
import Power from '../../../images/powerlogo.png'
import Wishlistheart from '@/components/Wishlistheart'
import Link from 'next/link'
const BestSeller = () => {

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
    <div className="container mx-auto px-4 py-4">

      <div className=' flex items-center justify-start gap-2 mb-4' >
       <Link href={'/'} > <p className=' text-sm cursor-pointer ' >Home</p> </Link>
        <p className=' text-sm cursor-pointer ' >/</p>
        <p className=' text-sm cursor-pointer text-green-700 ' >Brands</p>
      </div>

      {/* /////////////////Logo/////////////////// */}
      <div className=' flex items-center justify-center mb-2' >
        <h1 className=' text-md lg:text-2xl font-bold leading-5'>What's Your Fevriout Brand?</h1>
      </div>
      <div className=' container flex items-center justify-center gap-5 overflow-hidden ' >
       <Link href={'/nike'} > <Image className='h-12 lg:h-20 w-20 lg:w-50 py-1 px-1 border-2 border-gray-400 rounded-2xl bg-white shadow-2xs cursor-pointer ' src={Nike} alt='img'/> </Link>
       <Link href={'/adidas'} > <Image className='h-12 lg:h-20 w-20 lg:w-50 py-1 px-3 border-2 border-gray-400 rounded-2xl bg-white shadow-2xs cursor-pointer ' src={Adidas} alt='img'/> </Link>
       <Link href={'/panda'} > <Image className='h-12 lg:h-20 w-20 lg:w-50 py-1 px-1 border-2 border-gray-400 rounded-2xl bg-white shadow-2xs cursor-pointer ' src={Panda} alt='img'/> </Link>
       <Link href={'/power'} > <Image className='h-12 lg:h-20 w-20 lg:w-50 py-1 px-1 border-2 border-gray-400 rounded-2xl bg-white shadow-2xs cursor-pointer ' src={Power} alt='img'/> </Link>
      </div>
      {/* ////////////////Logo//////////////////// */}

      {/* /////////////////Nike////////////////// */}
      <div>
        <div className=' flex items-center justify-between mt-6 '>
      <div className="container flex items-center ">
        <div className="h-[27px] w-[13px] bg-red-700 mb-4 rounded-3xl " />
        <h2 className=" text-2xl font-bold mb-4 ml-2 ">Nike</h2>
      </div>

      <div className=' flex items-center justify-center gap-1 cursor-pointer mb-4 '>
      <Link href={'/nike'}> <p className=' flex items-center gap-1 text-nowrap text-sm border-b-1 lg:text-2xl'>See All <MoveRight /></p> </Link>
      </div>
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
                <Wishlistheart/>
                <Addtocardbutton />
                <div className="text-start pl-5 border-t-[1px] border-gray-400 py-2">
                  <h3 className="text-lg font-bold break-all ">{item.name || 'Product'}</h3>
                  <p className="text-red-500">TK.{item.price || ''}</p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
      {/* /////////////////Nike////////////////// */}

      {/* /////////////////Adides////////////////// */}
      <div className=' mt-10 '>
        <div className=' flex items-center justify-between'>
      <div className="container flex items-center ">
        <div className="h-[27px] w-[13px] bg-red-700 mb-4 rounded-3xl " />
        <h2 className=" text-2xl font-bold mb-4 ml-2 ">Adidas</h2>
      </div>

      <div className=' flex items-center justify-center gap-1 cursor-pointer mb-4 '>
      <Link href={'/adidas'}><p className=' flex items-center gap-1 text-nowrap text-sm border-b-1 lg:text-2xl'>See All <MoveRight /></p> </Link> 
      </div>
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
                <Wishlistheart/>
                <Addtocardbutton />
                <div className="text-start pl-5 border-t-[1px] border-gray-400 py-2">
                  <h3 className="text-lg font-bold break-all ">{item.name || 'Product'}</h3>
                  <p className="text-red-500">TK.{item.price || ''}</p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
      {/* /////////////////Adides////////////////// */}

      {/* /////////////////Panda////////////////// */}
      <div className=' mt-10 '>
        <div className=' flex items-center justify-between'>
              <div className="container flex items-center ">
                <div className="h-[27px] w-[13px] bg-red-700 mb-4 rounded-3xl " />
                <h2 className=" text-2xl font-bold mb-4 ml-2 ">Panda</h2>
              </div>
        
              <div className=' flex items-center justify-center gap-1 cursor-pointer mb-4 '>
              <Link href={'/panda'}> <p className=' flex items-center gap-1 text-nowrap text-sm border-b-1 lg:text-2xl'>See All <MoveRight /></p> </Link>
              </div>
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
                <Wishlistheart/>
                <Addtocardbutton />
                <div className="text-start pl-5 border-t-[1px] border-gray-400 py-2">
                  <h3 className="text-lg font-bold break-all ">{item.name || 'Product'}</h3>
                  <p className="text-red-500">TK.{item.price || ''}</p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
      {/* /////////////////Panda////////////////// */}

      {/* /////////////////Power////////////////// */}
      <div className=' mt-10 '>
        <div className=' flex items-center justify-between'>
              <div className="container flex items-center ">
                <div className="h-[27px] w-[13px] bg-red-700 mb-4 rounded-3xl " />
                <h2 className=" text-2xl font-bold mb-4 ml-2 ">Power</h2>
              </div>
        
              <div className=' flex items-center justify-center gap-1 cursor-pointer mb-4 '>
              <Link href={'/power'}> <p className=' flex items-center gap-1 text-nowrap text-sm border-b-1 lg:text-2xl'>See All <MoveRight /></p> </Link>
              </div>
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
                <Wishlistheart/>
                <Addtocardbutton />
                <div className="text-start pl-5 border-t-[1px] border-gray-400 py-2">
                  <h3 className="text-lg font-bold break-all ">{item.name || 'Product'}</h3>
                  <p className="text-red-500">TK.{item.price || ''}</p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
      {/* /////////////////Power////////////////// */}

    </div>
  )
}

export default BestSeller
