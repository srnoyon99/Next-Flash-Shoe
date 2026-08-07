'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';

// Swiper core + required modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Replace these with your own image paths (e.g. files in /public/images/)
const slides = [
  '/img1.webp',
  '/img2.webp',
  '/img3.webp',
  '/img4.webp',
  '/img5.webp',
  '/img6.webp',
  '/img7.webp',
  '/img8.webp',
  '/img9.webp',
];

export default function SwiperDemo() {
  return (
    <div className="relative h-[20vh] w-full sm:h-[70vh] md:h-[35vh] lg:h-[80vh] bg-black">
      <Swiper
        modules={[Navigation, Pagination, Keyboard, Autoplay]}
        slidesPerView={1}
        spaceBetween={30}
        loop
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
          pauseOnMouseEnter: false,
        }}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          // tweak per-breakpoint spacing/slides here if you ever want
          // multiple slides visible on larger screens
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 1, spaceBetween: 30 },
          1024: { slidesPerView: 1, spaceBetween: 30 },
        }}
        className="h-full w-full [--swiper-navigation-color:#fff] [--swiper-pagination-color:#fff]"
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i} className="relative bg-neutral-700">
            <Image
              src={src}
              alt={`Slide ${i + 1}`}
              fill
              sizes="100vw"
              className="object-cover cursor-pointer "
              priority={i === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}