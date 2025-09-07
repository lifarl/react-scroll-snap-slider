export interface CarouselProps {
  children: React.ReactNode
  renderCustomArrow?: ({
    direction,
    ref,
    onClick,
  }: CustomArrowProps) => JSX.Element
  slidesPerPageSettings?: SlidesPerPageSettings
  slideWidth?: number
  onScrollStart?: (index: number) => void
  onScrollEnd?: (index: number) => void
  onSlidesVisibilityChange?: (index: number) => void
  onSlideVisible?: (index: number) => void
  className?: string
  classes?: Partial<CarouselClasses>
  ariaLabel?: string
}

export interface SlidesPerPageSettings {
  mobileSmall: number
  mobileBig: number
  tablet: number
  desktop: number
}

interface CustomArrowProps {
  direction: 'prev' | 'next'
  ref: React.RefObject<HTMLButtonElement>
  onClick: (direction: 'prev' | 'next') => void
}

export interface CarouselClasses {
  root: string
  slider: string
  list: string
  slide: string
  nav: string
  navPrev: string
  navNext: string
  arrow: string
}
