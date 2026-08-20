import { render, screen, within } from '@testing-library/react'
import AccessoriesPage from '@/app/accessories/page'
import BrandsPage from '@/app/brands/page'
import CartPage from '@/app/cart/page'
import DiscountedProductPage from '@/app/discountedproduct/page'
import HomePage from '@/app/page'
import LeatherStudioPage from '@/app/leatherstudio/page'
import SneakerStudioPage from '@/app/sneakerstudio/page'
import WishlistPage from '@/app/wishlist/page'

const realSlides = (root = document) =>
  Array.from(root.querySelectorAll('.splide__slide:not(.splide__slide--clone)'))

const carousels = () => Array.from(document.querySelectorAll('.splide'))

const productGrid = () => document.querySelector('.grid-cols-2')

describe('HomePage', () => {
  it('composes the storefront sections in order', () => {
    render(<HomePage />)

    const headings = [
      'Products',
      'Best Seller',
      'Just Landed',
      'Which You Want ?',
      'Accessories',
    ]
    headings.forEach((name) =>
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    )
    expect(screen.getAllByTestId('swiper-slide')).toHaveLength(9)
  })
})

describe('CartPage', () => {
  it('renders an empty shell while the cart is unimplemented', () => {
    const { container } = render(<CartPage />)

    expect(container.firstChild).toBeEmptyDOMElement()
  })
})

describe('WishlistPage', () => {
  it('renders one card per saved item plus a suggestion carousel', () => {
    render(<WishlistPage />)

    expect(
      screen.getByRole('heading', { name: 'Your Fevriout item' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'You May Also Like' })
    ).toBeInTheDocument()

    const cards = Array.from(productGrid().children)
    expect(cards).toHaveLength(4)
    cards.forEach((card) => {
      expect(within(card).getByRole('button', { name: 'Add to Cart' })).toBeInTheDocument()
      expect(within(card).getByRole('heading', { name: 'shaker' })).toBeInTheDocument()
      expect(within(card).getByText('TK.$100')).toBeInTheDocument()
    })

    expect(realSlides()).toHaveLength(4)
  })

  it('offers pagination controls', () => {
    render(<WishlistPage />)

    expect(screen.getByRole('button', { name: 'Prev' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
  })
})

describe('AccessoriesPage', () => {
  it('renders the category carousel and the full product grid', () => {
    render(<AccessoriesPage />)

    expect(screen.getByRole('heading', { name: 'All Products' })).toBeInTheDocument()

    expect(realSlides(carousels()[0]).map((slide) => slide.textContent.trim())).toEqual([
      'Lides Bag',
      'Money Bag',
      'Backpack',
      'Belt',
      'Shoes Polish',
    ])
    expect(Array.from(productGrid().children)).toHaveLength(16)
  })
})

describe('DiscountedProductPage', () => {
  it('renders the item filter dropdown and the discounted grid', () => {
    render(<DiscountedProductPage />)

    expect(
      screen.getByRole('heading', { name: 'Your Discounted Products' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ITEM' })).toBeInTheDocument()
    ;['Man', 'Woman', "Kid's", 'Party Shoes', 'School Shoes', 'Collage Shoes'].forEach(
      (option) => expect(screen.getByText(option)).toBeInTheDocument()
    )

    expect(Array.from(productGrid().children)).toHaveLength(8)
  })
})

describe('LeatherStudioPage', () => {
  it('renders the banner, the filter dropdown and the product grid', () => {
    render(<LeatherStudioPage />)

    expect(screen.getByRole('heading', { name: 'FLASH SHOE' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Your Leather Products' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ITEM' })).toBeInTheDocument()
    expect(Array.from(productGrid().children)).toHaveLength(8)
  })
})

describe('SneakerStudioPage', () => {
  it('renders the hero image and the sneaker carousels', () => {
    render(<SneakerStudioPage />)

    expect(screen.getByAltText('Discounted Product')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Man Sneakers' })).toBeInTheDocument()
    expect(carousels().length).toBeGreaterThan(0)
    carousels().forEach((carousel) =>
      expect(realSlides(carousel).length).toBeGreaterThan(0)
    )
  })
})

describe('BrandsPage', () => {
  it('renders one carousel per brand', () => {
    render(<BrandsPage />)

    const brands = ['Nike', 'Adites', 'Panda', 'Power']
    brands.forEach((name) =>
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    )

    expect(carousels()).toHaveLength(brands.length)
    carousels().forEach((carousel) =>
      expect(realSlides(carousel)).toHaveLength(6)
    )
  })

  it('gives every brand carousel an "All" shortcut', () => {
    render(<BrandsPage />)

    expect(screen.getAllByRole('button', { name: 'All' })).toHaveLength(4)
  })
})
