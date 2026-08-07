"use client"
import React from 'react'

import { Splide, SplideSlide } from '@splidejs/react-splide'

const bestsell = () => {
  const images = [
    { src: '/img2.webp', alt: 'Image 1' },
    { src: '/img3.webp', alt: 'Image 2' },
    { src: '/img4.webp', alt: 'Image 3' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Splide options={{
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '1rem',
        breakpoints: {
          640: {
            perPage: 2,
          },
          768: {
            perPage: 2,
          },
        }
      }}>
        {images.map((image, index) => (
          <SplideSlide className={'cursor-pointer'} key={index}>
            <img className="w-full h-[300px] object-cover" src={image.src} alt={image.alt} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}

export default bestsell
