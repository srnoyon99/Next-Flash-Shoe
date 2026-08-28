"use client"
import React from 'react'
import { useState } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import Addtocardbutton from './addtocardbutton'
import Wishlistheart from './Wishlistheart'

const JustLanded = () => {
     const [selectedCategory, setSelectedCategory] = useState('sneakers')

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

     const sliderOptions = [
          { key: 'sneakers', name: 'Sneakers' },
          { key: 'leatherShoes', name: 'Leather Shoes' },
          { key: 'sandals', name: 'Sandals' },
          { key: 'bag', name: 'Bag' },
          { key: 'belt', name: 'Belt' },
          { key: 'wallet', name: 'Wallet' },
          { key: 'ladiesBag', name: 'Ladies Bag' },
          { key: 'ladiesShoes', name: 'Ladies Shoes' },
     ]

     const selectedOption = sliderOptions.find((option) => option.key === selectedCategory)

     // Pair products with images safely to avoid undefined accesses
     const items = products.map((product, idx) => ({
          ...product,
          image: images[idx] || images[0],
     }))

     const selectedItems = items.map((item, index) => ({
          ...item,
          name: `${selectedOption.name} Product ${index + 1}`,
     }))

     return (
          <div className="container mx-auto px-4 py-8">
               <div className="container flex items-center ">
                    <div className="h-[27px] w-[13px] bg-red-700 mb-4 rounded-3xl " />
                    <h2 className=" text-2xl font-bold mb-4 ml-2 ">Just Landed</h2>
               </div>
               <div className="mb-7">
                    <Splide options={{
                         perPage: 8,
                         perMove: 1,
                         gap: '1rem',
                         breakpoints: {
                              640: {
                                   perPage: 3,
                              },
                              1024: {
                                   perPage: 4,
                              },
                         },
                    }}>
                         {sliderOptions.map((option) => (
                              <SplideSlide className="mb-7" key={option.key}>
                                   <button
                                        type="button"
                                        aria-pressed={selectedCategory === option.key}
                                        onClick={() => setSelectedCategory(option.key)}
                                        className={`w-full cursor-pointer rounded-3xl border-1 py-2 ${selectedCategory === option.key ? 'border-orange-400 bg-orange-50 dark:bg-gray-900 ' : 'border-gray-400/50 bg-transparent'}`}
                                   >
                                        <h3 className="text-sm lg:text-5 md:text-lg font-bold text-center">{option.name}</h3>
                                   </button>
                              </SplideSlide>
                         ))}
                    </Splide>
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


                    {selectedItems.map((item, index) => (
                         <SplideSlide className={'cursor-pointer border-1 rounded-3xl border-gray-400 min-h-fit shadow-2xs '} key={index}>
                              <div className="  rounded-3xl grid-rows-1 items-center justify-center">
                                   <img className=" w-full h-full lg:w-full lg:h-full object-cover rounded-t-3xl " src={item.image.src} alt={item.image.alt} />
                                   <Wishlistheart/>
                                   <Addtocardbutton/>
                                   <div className="text-start pl-5 border-t-[1px] border-gray-400 py-2">
                                        <h3 className="text-lg font-bold break-all ">{item.name}</h3>
                                        <p className="text-red-500">TK.{item.price || ''}</p>
                                   </div>
                              </div>
                         </SplideSlide>
                    ))}
               </Splide>

          </div>
     )
}

export default JustLanded
