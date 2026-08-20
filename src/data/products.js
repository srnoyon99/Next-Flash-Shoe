export const shoeImages = [
  { src: '/shoe1.avif', alt: 'Image 1' },
  { src: '/shoe2.avif', alt: 'Image 2' },
  { src: '/shoe3.avif', alt: 'Image 3' },
  { src: '/shoe4.webp', alt: 'Image 4' },
  { src: '/shoe5.avif', alt: 'Image 5' },
  { src: '/shoe6.avif', alt: 'Image 6' },
  { src: '/shoe7.avif', alt: 'Image 7' },
  { src: '/shoe8.avif', alt: 'Image 8' },
  { src: '/shoe9.avif', alt: 'Image 9' },
  { src: '/shoe10.avif', alt: 'Image 10' },
]

export const categoryImages = [
  { src: '/img2.webp', alt: 'Image 1' },
  { src: '/img3.webp', alt: 'Image 2' },
  { src: '/img4.webp', alt: 'Image 3' },
  { src: '/img5.webp', alt: 'Image 4' },
  { src: '/img6.webp', alt: 'Image 5' },
  { src: '/img7.webp', alt: 'Image 6' },
]

export const products = [
  { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '40', size1: '42', size2: '38' },
  { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '42', size1: '44', size2: '46' },
  { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '38', size1: '44', size2: '46' },
  { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: 'M', size1: '44', size2: '46' },
  { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '40', size1: '44', size2: '46' },
  { name: 'shaker', price: '$100', color: 'Red', color1: 'Blue', color2: 'Green', size: '41', size1: '44', size2: '46' },
]

export const withImages = (productList, images, { wrap = false } = {}) => productList.map((product, index) => ({
  ...product,
  image: wrap ? images[index % images.length] || images[0] : images[index] || images[0],
}))

export const categoryProducts = [
  { name: 'MAN' },
  { name: 'WOMAN' },
  { name: 'KIDS' },
  { name: 'ACCESSORIES' },
  { name: 'SHOES' },
  { name: 'CLOTHING' },
]
