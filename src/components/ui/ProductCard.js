"use client"
import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { Heart } from 'lucide-react'

export const productCarouselOptions = (perPage, breakpoints) => ({
  type: 'loop',
  perPage,
  perMove: 1,
  gap: '1rem',
  breakpoints,
})

export const ProductCard = ({
  item,
  grid = false,
  mobileHeartSize = 25,
  mobileHeartClassName,
  innerClassName,
  imageClassName = ' w-full h-full lg:w-full lg:h-full object-cover rounded-t-3xl ',
}) => (
  <div className={innerClassName || (grid
    ? " relative items-center justify-center rounded-3xl overflow-hidden"
    : "  rounded-3xl grid-rows-1 items-center justify-center")}>
    <img className={imageClassName} src={item.image.src} alt={item.image.alt} />
    <Heart className={grid ? ' absolute hidden lg:block top-7 right-5' : 'absolute hidden lg:block top-7 right-5'} color="#000000" size={30} strokeWidth={2} />
    <Heart className={mobileHeartClassName || (grid ? ' absolute lg:hidden top-7 right-5' : 'absolute lg:hidden top-7 right-5')} color="#000000" size={mobileHeartSize} strokeWidth={2} />
    <p className="text-gray-800 dark:text-white text-center "> {item.size} | {item.size1} | {item.size2}</p>
    <button className="bg-gray-900 dark:bg-gray-400 text-white w-full py-2 h-full mt-2 cursor-pointer hover:bg-red-800 transition duration-300">Add to Cart</button>
    <div className="text-start pl-5 border-t-[1px] border-gray-400 py-2">
      <h3 className="text-lg font-bold break-all ">{item.name || 'Product'}</h3>
      <p className="text-red-500">TK.{item.price || ''}</p>
      <p className="text-gray-800 dark:text-white">Color: {item.color} | {item.color1} | {item.color2}</p>
    </div>
  </div>
)

export const ProductCarousel = ({
  items,
  options,
  slideClassName = 'cursor-pointer border-1 rounded-3xl border-gray-400/20 min-h-fit shadow-2xs ',
  mobileHeartSize = 25,
}) => (
  <Splide options={options}>
    {items.map((item, index) => (
      <SplideSlide className={slideClassName} key={index}>
        <ProductCard item={item} mobileHeartSize={mobileHeartSize} />
      </SplideSlide>
    ))}
  </Splide>
)
