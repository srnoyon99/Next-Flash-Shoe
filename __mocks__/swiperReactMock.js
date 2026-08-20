// Swiper ships ESM only, which next/jest never transforms inside node_modules.
// These pass-through components let the slider render its slides in jsdom.
const React = require('react')

const Swiper = ({ children, className }) =>
  React.createElement('div', { 'data-testid': 'swiper', className }, children)

const SwiperSlide = ({ children, className }) =>
  React.createElement('div', { 'data-testid': 'swiper-slide', className }, children)

module.exports = { Swiper, SwiperSlide }
