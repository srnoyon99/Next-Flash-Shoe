"use client"
import React from 'react'
import { Heart } from 'lucide-react'
import letherstudio from '../../../public/letherstudio.webp'
import Image from 'next/image'
import Cummonbutton from '@/components/cummonbutton'
import Addtocardbutton from '@/components/addtocardbutton'
import Wishlistheart from '@/components/Wishlistheart'
import Link from 'next/link'

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
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '38', size1: '44', size2: '46' },
    { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: 'M', size1: '44', size2: '46' },
  ]

  // Pair products with images safely to avoid undefined accesses
  const items = products.map((product, idx) => ({
    ...product,
    image: images[idx] || images[0],
  }))

  return (
    <div>
      <div className="container mx-auto px-4 py-4">

        <div className=' flex items-center justify-start gap-2' >
       <Link href={'/'} > <p className=' text-sm cursor-pointer ' >Home</p> </Link>
        <p className=' text-sm cursor-pointer ' >/</p>
        <p className=' text-sm cursor-pointer text-green-700 ' >Accessories</p>
      </div>

        {/* //////////////Bennar//////////////// */}
        <div className=" inset-0 flex flex-col items-center justify-center bg-opacity-50">
          <div className="relative grid items-center justify-center gap-3 ">
            <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64  rounded-full blur-[170px] pointer-events-none" />
            <h3 className="text-center font-extrabold leading-10 text-transparent dark:text-white text-2xl lg:text-5xl text-nowrap [-webkit-text-stroke:1px_#0D542B] bg-clip-text  bg-red-500 mt-6" >
              FLASH LEATHER
            </h3>
          </div>
        </div>
        {/* /////////////Bennar///////////////// */}


        <div className="container flex items-center justify-between pt-5 ">

          <div className=" flex items-center justify-center " >
            <div className="h-[20px] w-[20px] bg-red-700 mb-4 rounded-3xl " />
            <h2 className=" text-lg lg:text-2xl font-bold mb-4 ml-2 ">Your Leather Products</h2>
          </div>

          <div className="dropdown dropdown-end">
            <button tabIndex={0} role="button" className=" py-1 px-3 rounded-2xl bg-green-700 border-1 border-black dark:border-amber-50 cursor-pointer  text-white m-1 mb-5">ITEM </button>
            <ul tabIndex="-1" className="dropdown-content menu border-1 bg-gray-300 dark:bg-gray-700 text-black dark:text-white  rounded-box z-1 w-52 p-2 shadow-2xl">
              <li><a className=" bg-white dark:bg-gray-500 hover:bg-amber-200 dark:hover:bg-gray-600 border-1">Shoes</a></li>
              <li><a className=" bg-white dark:bg-gray-500 hover:bg-amber-200 dark:hover:bg-gray-600 border-1 mt-1">Belt</a></li>
              <li><a className=" bg-white dark:bg-gray-500 hover:bg-amber-200 dark:hover:bg-gray-600 border-1 mt-1">Money Bag</a></li>
              <li><a className=" bg-white dark:bg-gray-500 hover:bg-amber-200 dark:hover:bg-gray-600 border-1 mt-1">Leather Bags</a></li>
              <li><a className=" bg-white dark:bg-gray-500 hover:bg-amber-200 dark:hover:bg-gray-600 border-1 mt-1">Ledis Items</a></li>
            </ul>
          </div>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div className={'cursor-pointer border-1 rounded-3xl border-gray-400/20 min-h-fit shadow-2xs '} key={index}>
              <div className=" relative items-center justify-center rounded-3xl overflow-hidden">
                <img className=" w-full h-full lg:w-full lg:h-full object-cover rounded-t-3xl " src={item.image.src} alt={item.image.alt} />
                <Wishlistheart/>
                <Addtocardbutton />
                <div className="text-start pl-5 border-t-[1px] border-gray-400 py-2">
                  <h3 className="text-lg font-bold break-all ">{item.name || 'Product'}</h3>
                  <p className="text-red-500">TK.{item.price || ''}</p>
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
    </div>
  )
}

export default page