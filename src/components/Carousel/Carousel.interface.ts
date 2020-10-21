export interface CarouselProps {
  onSlideVisible?: (index: number) => void
  renderCustomArrow?: ({
    direction,
    ref,
    onClick,
  }: CustomArrowProps) => JSX.Element
  slidesPerPageSettings?: SlidesPerPageSettings
  slideWidth?: number
  onScroll?: () => void
  afterScroll?: (index: number) => void
  children: React.ReactNode
}

export interface SlidesPerPageSettings {
  mobileSmall: number
  mobileBig: number
  tablet: number
  desktop: number
}

interface CustomArrowProps {
  direction: 'prev' | 'next'
  ref: React.RefObject<HTMLDivElement>
  onClick: (direction: 'prev' | 'next') => void
}
