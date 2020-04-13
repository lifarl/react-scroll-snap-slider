import { slidesPerPageSettings } from '../Carousel/Carousel.interface'

export interface SlideProps {
  slideIndex: number
  children?: React.ReactNode
  slidesPerPageSettings?: slidesPerPageSettings
}

export interface StyledSlideProps {
  slidesPerPageSettings?: slidesPerPageSettings
  showMultiItem?: boolean
}
