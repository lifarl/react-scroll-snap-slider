import { SlidesPerPageSettings } from '../Carousel/Carousel.interface'

export interface SlideProps {
  slideIndex: number
  children?: React.ReactNode
  slidesPerPageSettings?: SlidesPerPageSettings
}

export interface StyledSlideProps {
  slidesPerPageSettings?: SlidesPerPageSettings
  showMultiItem?: boolean
}
