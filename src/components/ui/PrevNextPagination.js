"use client"
import React from 'react'

export const PrevNextPagination = () => (
  <div className="flex justify-center mt-8 space-x-4">
    <button className="bg-gray-900 dark:bg-gray-400 text-white dark:text-black py-1 px-4 rounded-lg hover:bg-red-700 transition duration-300 cursor-pointer"> Prev</button>
    <button className="bg-gray-900 dark:bg-gray-400 text-white dark:text-black py-1 px-4 rounded-lg hover:bg-green-500 transition duration-300 cursor-pointer"> Next</button>
  </div>
)
