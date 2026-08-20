import { render, screen, within } from '@testing-library/react'
import Accessories from '@/components/accessories'
import BestSeller from '@/components/bestseller'
import Footer from '@/components/footer'
import JustLanded from '@/components/justlanded'
import Products from '@/components/products'
import SwiperDemo from '@/components/slider'
import Youwant from '@/components/youwant'

// Splide is configured with `type: 'loop'`, so it duplicates slides at both
// ends of the track. Only the original slides are asserted on.
const realSlides = (root = document) =>
  Array.from(root.querySelectorAll('.splide__slide:not(.splide__slide--clone)'))

const carousels = () => Array.from(document.querySelectorAll('.splide'))

describe('Products', () => {
  it('labels each of the six category slides', () => {
    render(<Products />)

    expect(screen.getByRole('heading', { name: 'Products' })).toBeInTheDocument()

    const slides = realSlides()
    expect(slides).toHaveLength(6)
    expect(slides.map((slide) => slide.textContent.trim())).toEqual([
      'MAN',
      'WOMAN',
      'KIDS',
      'ACCESSORIES',
      'SHOES',
      'CLOTHING',
    ])
    expect(
      slides.map((slide) => slide.querySelector('img').getAttribute('src'))
    ).toEqual([
      '/img2.webp',
      '/img3.webp',
      '/img4.webp',
      '/img5.webp',
      '/img6.webp',
      '/img7.webp',
    ])
  })
})

describe('BestSeller', () => {
  it('renders one card per product', () => {
    render(<BestSeller />)

    expect(screen.getByRole('heading', { name: 'Best Seller' })).toBeInTheDocument()
    expect(realSlides()).toHaveLength(6)
  })

  it('shows the name, price, sizes and colours on a card', () => {
    render(<BestSeller />)

    const card = within(realSlides()[0])
    expect(card.getByRole('heading', { name: 'shaker' })).toBeInTheDocument()
    expect(card.getByText('TK.$100')).toBeInTheDocument()
    expect(card.getByText('40 | 42 | 38')).toBeInTheDocument()
    expect(card.getByText('Color: Red | Blue | Green')).toBeInTheDocument()
    expect(card.getByRole('button', { name: 'Add to Cart' })).toBeInTheDocument()
  })

  it('pairs every card with a distinct image', () => {
    render(<BestSeller />)

    expect(
      realSlides().map((slide) => slide.querySelector('img').getAttribute('src'))
    ).toEqual([
      '/shoe1.avif',
      '/shoe2.avif',
      '/shoe3.avif',
      '/shoe4.webp',
      '/shoe5.avif',
      '/shoe6.avif',
    ])
  })
})

describe('Accessories', () => {
  it('renders a single carousel of six accessory cards', () => {
    render(<Accessories />)

    expect(screen.getByRole('heading', { name: 'Accessories' })).toBeInTheDocument()
    expect(carousels()).toHaveLength(1)

    const slides = realSlides()
    expect(slides).toHaveLength(6)
    slides.forEach((slide) =>
      expect(
        within(slide).getByRole('button', { name: 'Add to Cart' })
      ).toBeInTheDocument()
    )
  })
})

describe('JustLanded', () => {
  it('renders a category filter carousel alongside the product carousel', () => {
    render(<JustLanded />)

    expect(screen.getByRole('heading', { name: 'Just Landed' })).toBeInTheDocument()

    const [filterCarousel, productCarousel] = carousels()
    expect(realSlides(filterCarousel).map((slide) => slide.textContent.trim())).toEqual(
      [
        'Sneakers',
        'Party Shoes',
        'Casual Shoes',
        'Formal Shoes',
        'Leather Items',
        'Sports Shoes',
        'Slippers',
        'Sandals',
      ]
    )
    expect(realSlides(productCarousel)).toHaveLength(6)
  })
})

describe('Youwant', () => {
  it('renders each audience panel in both the grid and the mobile carousel', () => {
    render(<Youwant />)

    expect(
      screen.getByRole('heading', { name: 'Which You Want ?' })
    ).toBeInTheDocument()

    const audiences = ['MAN', 'WOMAN', 'KIDS']
    const gridPanels = Array.from(
      document.querySelectorAll('.hidden.lg\\:block')
    )

    expect(gridPanels.map((panel) => panel.querySelector('h1').textContent)).toEqual(
      audiences
    )
    expect(
      realSlides().map((slide) => slide.querySelector('h1').textContent)
    ).toEqual(audiences)

    gridPanels.forEach((panel) =>
      expect(within(panel).getByText('SHOP NOW')).toBeInTheDocument()
    )
  })
})

describe('Footer', () => {
  it('renders the important and social link groups', () => {
    render(<Footer />)

    expect(
      screen.getByRole('heading', { name: 'Important Links' })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Social Links' })).toBeInTheDocument()
    ;['Home', 'About', 'Portfolio', 'Contact', 'FAQ'].forEach((label) =>
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    )
    ;['Twitter', 'Instagram', 'Youtube', 'TikTok'].forEach((label) =>
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    )
  })

  it('shows the current year in the copyright line', () => {
    render(<Footer />)

    expect(
      screen.getByText(
        `© ${new Date().getFullYear()} FLASH COMFORT. All rights reserved.`
      )
    ).toBeInTheDocument()
  })
})

describe('SwiperDemo', () => {
  it('renders all nine hero slides', () => {
    render(<SwiperDemo />)

    expect(screen.getAllByTestId('swiper-slide')).toHaveLength(9)
    for (let i = 1; i <= 9; i += 1) {
      expect(screen.getByAltText(`Slide ${i}`)).toBeInTheDocument()
    }
  })

  it('opts the first slide out of lazy loading', () => {
    render(<SwiperDemo />)

    expect(screen.getByAltText('Slide 1')).not.toHaveAttribute('loading')
    expect(screen.getByAltText('Slide 2')).toHaveAttribute('loading', 'lazy')
  })
})
