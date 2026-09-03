"use client"
import Accessories from '@/components/accessories'
import BestSeller from '@/components/bestseller'
import Choosesneakers from '@/components/Choosesneakers'
import Combopack from '@/components/Combopack'
import JustLanded from '@/components/justlanded'
import Products from '@/components/products'
import SwiperCarousel from '@/components/slider'
import Youwant from '@/components/youwant'
import React from 'react'

const page = () => {
  return (
    <div>
      <SwiperCarousel/>
      <Products/>
      <BestSeller/>
      <JustLanded/>
      <Combopack/>
      <Youwant/>
      <Accessories/>
      <Choosesneakers/>
    </div>
  )
}

export default page