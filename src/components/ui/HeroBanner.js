"use client"
import React from 'react'

export const HeroBanner = ({
  subtitle,
  children,
  className = ' inset-0 flex flex-col items-center justify-center bg-opacity-50',
  titleClassName = 'text-center font-extrabold leading-5 text-transparent text-2xl lg:text-5xl text-nowrap [-webkit-text-stroke:1px_#0D542B] bg-clip-text  bg-red-500 mt-6',
  subtitleClassName = 'text-2xl lg:text-5xl text-gray-800 dark:text-amber-50 text-center mt-0 lg:mt-5 font-bold leading-5 text-balance lg:text-nowrap bg-clip-text bg-red-500',
}) => (
  <div className={className}>
    <div className="relative grid items-center justify-center gap-3 ">
      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64  rounded-full blur-[170px] pointer-events-none" />
      <h3 className={titleClassName}>
        FLASH SHOE
      </h3>
      <h3 className={subtitleClassName}>
        Your one-stop destination for all your {subtitle} needs
      </h3>
    </div>
    {children}
  </div>
)
