import { NavArrowProps } from '../NavArrow/NavArrow.interface'

export interface CarouselProps {
  onSlideVisible?: (index: number) => void
  renderCustomArrow?: ({
    direction,
    ref,
    onClick,
  }: CustomArrowProps) => JSX.Element
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
  ref: React.RefObject<HTMLDivElement>
  onClick: (direction: 'prev' | 'next') => void
}
