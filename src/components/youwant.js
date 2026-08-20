"use client"
import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { Heart } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'

const Youwant = () => {

     const images = [
          { src: '/whichman.webp', alt: 'Image 1' },
          { src: '/whichwomen.webp', alt: 'Image 2' },
          { src: '/whichkides.webp', alt: 'Image 3' },
     ]

     const descriptions = [
          { name: 'MAN', pragraph: 'Step into Bata chic collection of casual shoes for women, blending everyday comfort with style. Perfect for any occasion, ensuring confidence & effortless elegance.', Button:'SHOP NOW' },
          { name: 'WOMAN', pragraph: 'Step into Bata chic collection of casual shoes for women, blending everyday comfort with style. Perfect for any occasion, ensuring confidence & effortless elegance.', Button:'SHOP NOW' },
          { name: 'KIDS', pragraph: 'Step into Bata chic collection of casual shoes for women, blending everyday comfort with style. Perfect for any occasion, ensuring confidence & effortless elegance.', Button:'SHOP NOW' },
     ]

     return (
          <div className="container mx-auto px-4 py-8">
               <SectionHeading title="Which You Want ?" />

               <div className=" flex items-center justify-center gap-4">
                    {images.map((image, index) => (
                         <div className=" hidden lg:block rounded-3xl border-1 border-gray-400/20 min-h-fit shadow-2xs" key={index}>
                              <div className="  rounded-3xl flex-col items-center justify-center">
                              <img className=" w-120 h-120 object-cover overflow-hidden rounded-t-3xl cursor-pointer " src={image.src} alt={image.alt} />
                              <h1 className="text-lg font-bold text-center mt-2">{descriptions[index].name}</h1>
                              <p className="text-gray-800 dark:text-white text-center mt-2">{descriptions[index].pragraph}</p>
                              <div className=" bg-transparent text-center text-black dark:text-white border-gray-400/20 rounded-2xl leading-5 font-bold cursor-pointer py-3 h-full mt-2 transition duration-300">{descriptions[index].Button}</div>
                              </div>
                         </div>
                         
                    ))
                    }
               </div>

               <div className="lg:hidden ">
                    <Splide options={{
                         type: 'loop',
                         perPage: 1,
                         perMove: 1,
                         gap: '1rem',

                    }}>

                         {images.map((image, index) => (
                              <SplideSlide className={'cursor-pointer border-1 rounded-3xl border-gray-400/20 min-h-fit shadow-2xs '} key={index}>
                                   <div className="  rounded-3xl grid-rows-1 items-center justify-center">
                                        <img className=" w-full h-full lg:w-full lg:h-full object-cover overflow-hidden rounded-t-3xl " src={image.src} alt={image.alt} />
                                        <h1 className="text-lg font-bold text-center mt-2">{descriptions[index].name}</h1>
                                        <p className="text-gray-800 dark:text-white text-center mt-2">{descriptions[index].pragraph}</p>
                                        <div className=" bg-transparent text-center text-black dark:text-white border-gray-400/20 rounded-2xl leading-5 font-bold cursor-pointer py-3 h-full mt-2 transition duration-300">{descriptions[index].Button}</div>
                                   </div>
                              </SplideSlide>
                         ))}
                    </Splide>
               </div>

          </div>
     )
}

export default Youwant
