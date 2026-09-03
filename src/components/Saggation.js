import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import Addtocardbutton from './addtocardbutton'
import Wishlistheart from './Wishlistheart'

const Saggation = () => {

     const images = [
          { src: '/shoe1.avif', alt: 'Image 1' },
          { src: '/shoe2.avif', alt: 'Image 2' },
          { src: '/shoe3.avif', alt: 'Image 3' },
          { src: '/shoe4.webp', alt: 'Image 4' },

     ]

     const products = [
          { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '40', size1: '42', size2: '38' },
          { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '42', size1: '44', size2: '46' },
          { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '38', size1: '44', size2: '46' },
          { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: 'M', size1: '44', size2: '46' },
     ]

     // Pair products with images safely to avoid undefined accesses
     const items = products.map((product, idx) => ({
          ...product,
          image: images[idx] || images[0],
     }))


     return (
          <div className=' container mx-auto px-4 py-8'>

               {/* ////////////////Saggation////////////// */}
               <div className=" pt-12">
                    <div className=" flex items-center ">
                         <div className="h-[30px] w-[20px] bg-red-700 mb-4 rounded-3xl " />
                         <h2 className=" text-2xl font-bold mb-4 ml-2 ">You May Also Like</h2>
                    </div>

                    <Splide options={{
                         type: 'loop',
                         perPage: 6,
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

                         {items.map((item, index) => (
                              <SplideSlide className={'cursor-pointer border-1 rounded-3xl border-gray-400/20 min-h-fit shadow-2xs '} key={index}>
                                   <div className="  rounded-3xl grid-rows-1 items-center justify-center">
                                        <img className=" w-full h-full lg:w-full lg:h-full object-cover rounded-t-3xl " src={item.image.src} alt={item.image.alt} />
                                        <Addtocardbutton/>
                                        <Wishlistheart/>
                                        <div className="text-start pl-5 border-t-[1px] border-gray-400 py-2">
                                             <h3 className="text-lg font-bold break-all ">{item.name || 'Product'}</h3>
                                             <p className="text-red-500">TK.{item.price || ''}</p>
                                        </div>
                                   </div>
                              </SplideSlide>
                         ))}
                    </Splide>

               </div>

          </div>
     )
}

export default Saggation
