import { NavArrowProps } from '../NavArrow/NavArrow.interface'

export interface CarouselProps {
  onSlideVisible?: (index: number) => void
  renderCustomArrow?: ({ ...CustomArrowProps }) => JSX.Element
  slidesPerPageSettings?: SlidesPerPageSettings
  onScroll?: () => void
}

export interface SlidesPerPageSettings {
  mobile: number
  tablet: number
  desktop: number
}

interface CustomArrowProps {
  direction: 'prev' | 'next'
  ref: HTMLDivElement
  onClick: (direction: 'prev' | 'next') => void
}
