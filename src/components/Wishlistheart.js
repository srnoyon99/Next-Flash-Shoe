'use client'

import { Heart } from 'lucide-react'
import { useState } from 'react'

const Wishlistheart = () => {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <button
    className=' cursor-pointer '
      type='button'
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={isWishlisted}
      onClick={() => setIsWishlisted((current) => !current)}
    >
      <Heart
        className='absolute hidden lg:block top-7 right-5'
        color={isWishlisted ? '#ef4444' : '#000000'}
        fill={isWishlisted ? '#ef4444' : 'none'}
        size={30}
        strokeWidth={2}
      />
      <Heart
        className='absolute lg:hidden top-7 right-5'
        color={isWishlisted ? '#ef4444' : '#000000'}
        fill={isWishlisted ? '#ef4444' : 'none'}
        size={25}
        strokeWidth={2}
      />
    </button>
  )
}

export default Wishlistheart
