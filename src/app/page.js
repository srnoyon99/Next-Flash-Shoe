"use client"
import BestSeller from '@/components/bestseller'
import Products from '@/components/products'
import SwiperCarousel from '@/components/slider'
import React from 'react'

const page = () => {
  return (
    <div>
      <SwiperCarousel/>
      <Products/>
      <BestSeller/>
    </div>
  )
}

export default page