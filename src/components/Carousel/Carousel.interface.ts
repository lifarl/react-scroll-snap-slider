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
  ScrollIndicatorComponent?: React.FC<{
    handlePositionLeft?: string
    handleWidth?: string
    isSliderScrollable?: boolean
  }>
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
