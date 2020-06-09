import { SlidesPerPageSettings } from '../Carousel/Carousel.interface'

export interface SlideProps {
  slideIndex: number
  children?: React.ReactNode
  slidesPerPageSettings?: SlidesPerPageSettings
  slideWidth?: number
}

export interface StyledSlideProps {
  slidesPerPageSettings?: SlidesPerPageSettings
  slideWidth?: number
}
