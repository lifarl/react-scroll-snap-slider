import { Carousel } from './components/Carousel/index'
export const Slider = Carousel

// Components
export {
  StyledCarousel,
  StyledSlider,
  StyledUl,
} from './components/Carousel/Carousel.styled'
export { StyledSlide } from './components/Slide/Slide.styled'
export {
  StyledNavWrapper,
  StyledArrow,
} from './components/NavArrow/NavArrow.styled'

// Public types
export type { CarouselRef } from './components/Carousel/index'
export type {
  CarouselProps as SliderProps,
  CarouselProps,
  SlidesPerPageSettings,
  CarouselClasses,
} from './components/Carousel/Carousel.interface'
export type {
  SlideProps,
  StyledSlideProps,
} from './components/Slide/Slide.interface'
export type { NavArrowProps } from './components/NavArrow/NavArrow.interface'
